import { useEffect, useState } from "react";
import { supabase } from "../../../core/supabase/client";

export default function SaisonList() {
    const [saisons, setSaisons] = useState([]);
    const [nom, setNom] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    const loadSaisons = async () => {
        const { data, error } = await supabase
            .from("saisons")
            .select("*")
            .order("date_debut", { ascending: true }); // 🔥 ordre chronologique

        if (!error) setSaisons(data);
    };

    useEffect(() => {
        loadSaisons();
    }, []);

    // ➕ CREATE
    const createSaison = async () => {
        if (!nom) return;

        const { error } = await supabase.from("saisons").insert({
            nom,
            date_debut: dateDebut ? new Date(dateDebut).toISOString() : null,
            date_fin: dateFin ? new Date(dateFin).toISOString() : null,
            active: false
        });

        if (!error) {
            setNom("");
            setDateDebut("");
            setDateFin("");
            loadSaisons();
        }
    };

    // ⭐ ACTIVER UNE SAISON (UNE SEULE ACTIVE)
    const activateSaison = async (id) => {

        // 1. désactiver tout
        await supabase
            .from("saisons")
            .update({ active: false })
            .neq("id", null);

        // 2. activer celle choisie
        const { error } = await supabase
            .from("saisons")
            .update({ active: true })
            .eq("id", id);

        if (!error) {
            loadSaisons();
        }
    };

    // ⛔ DESACTIVER
    const deactivateSaison = async (id) => {
        await supabase
            .from("saisons")
            .update({ active: false })
            .eq("id", id);

        loadSaisons();
    };

    return (
        <div>
            <h1>📅 Saisons</h1>

            {/* FORM */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    placeholder="Nom saison"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />

                <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                />

                <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                />

                <button onClick={createSaison}>
                    ➕ Créer
                </button>
            </div>

            {/* LIST */}
            <div>
                {saisons.map((s) => (
                    <div
                        key={s.id}
                        style={{
                            padding: 10,
                            border: "1px solid #ddd",
                            marginBottom: 10,
                            borderRadius: 5,
                            background: s.active ? "#e6ffe6" : "white"
                        }}
                    >
                        <b>
                            {s.nom} {s.active && "⭐ ACTIVE"}
                        </b>

                        <div style={{ fontSize: 12, opacity: 0.6 }}>
                            Début : {s.date_debut}
                        </div>

                        <div style={{ fontSize: 12, opacity: 0.6 }}>
                            Fin : {s.date_fin}
                        </div>

                        <div style={{ marginTop: 8, display: "flex", gap: 10 }}>

                            {!s.active && (
                                <button onClick={() => activateSaison(s.id)}>
                                    ⭐ Activer
                                </button>
                            )}

                            {s.active && (
                                <button onClick={() => deactivateSaison(s.id)}>
                                    ⛔ Désactiver
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}