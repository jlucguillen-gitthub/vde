import CRUDPage from "../../../../framework/crud/CRUDPage";
import { saisonConfig } from "../../../../config/entities/saison.config";
import { useSaison } from "../../../../components/contexts/SaisonContext";

export default function SaisonPage({ setSaisonActiveNom }) {
    const saisonContext = useSaison();
    return <CRUDPage 
    config={saisonConfig}
    context={saisonContext} />;
}