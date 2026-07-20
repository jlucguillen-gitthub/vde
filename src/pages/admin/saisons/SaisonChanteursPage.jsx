import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SaisonChanteurController } from "../../../controllers/SaisonChanteurController";
import CRUDPage from "../../../framework/crud/CRUDPage";
import { saisonChanteurConfig } from "../../../config/entities/saisonChanteur.config";
import { useSaison } from "../../../components/contexts/SaisonContext";


export default function SaisonChanteursPage() {
    const [session, setSession] = useState(null);
    const { saisonSelectionne } = useSaison();
    console.log("saisonSelectionne", saisonSelectionne)
    const { nom } = useParams();

    
    return (
        <CRUDPage
            config={saisonChanteurConfig}
            context={{
                title: saisonChanteurConfig.title + " : " + nom,
                saisonId: saisonSelectionne.id
            }}
        />
    );
}