import { createContext, useContext, useEffect, useState } from "react";
import { SaisonController } from "../../controllers/SaisonController";

const SaisonContext = createContext();

export function SaisonProvider({ children }) {

    console.log("SaisonProvider")
    // c'est la saison ACTIVE il n' y en a qu'une
    const [saisonActive, setSaisonActive] = useState(null); 
    const [saisonSelectionne, setSaisonSelectionne] = useState(null); 
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
                saisonActive,
                updateSaisonActive,
                saisonSelectionne,
                updateSaisonSelectionne
                
            }}
        >
            {children}
        </SaisonContext.Provider>
    );
}

export function useSaison() {
    return useContext(SaisonContext);
}