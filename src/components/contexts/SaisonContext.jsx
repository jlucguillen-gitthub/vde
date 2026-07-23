import { createContext, useContext, useEffect, useState } from "react";
import { SaisonController } from "../../controllers/SaisonController";

const SaisonContext = createContext();

export function SaisonProvider({ children }) {

    console.log("SaisonProvider")
    // c'est la saison ACTIVE il n' y en a qu'une
    const [saisonActive, setSaisonActive] = useState(null);
    const [saisonSelectionne, setSaisonSelectionne] = useState(null);
    const [saisons, setSaisons] = useState([]);
    const controller = new SaisonController();
    useEffect(() => {
        controller.getActive(
            (saison) => {
                setSaisonActive(saison);
            },
            (errors) => {
                console.error(errors);
            }
        );
    }, []);
    useEffect(() => {
        refresh();
    }, []);
    const refresh = () => {

        controller.getAll(
            (liste) => {

                const saisonsTriees = [...liste]
                    .filter(s => !s.supprime)
                    .sort((a, b) => {

                        if (a.active && !b.active) return -1;
                        if (!a.active && b.active) return 1;

                        return b.date_debut.localeCompare(a.date_debut);
                    });

                setSaisons(saisonsTriees);

                const active = saisonsTriees.find(s => s.active) ?? null;

                setSaisonActive(active);

                setSaisonSelectionne(prev => {

                    if (!prev)
                        return active;

                    return saisonsTriees.find(s => s.id === prev.id) ?? active;
                });

            },
            console.error
        );

    };
    const updateSaisonActive = (saison) => {
        setSaisonActive(saison);
    };
    const updateSaisonSelectionne = (saison) => {
        console.log("nouvelle selecrtion", saison)
        setSaisonSelectionne(saison);
    };
    return (
        <SaisonContext.Provider
            value={{
                saisons,
                saisonActive,
                saisonSelectionne,
                refresh,
                updateSaisonActive: setSaisonActive,
                updateSaisonSelectionne: setSaisonSelectionne
            }}
        >
            {children}
        </SaisonContext.Provider>
    );
}

export function useSaison() {
    return useContext(SaisonContext);
}