import CRUDPage from "../../../framework/crud/CRUDPage";
import { saisonConfig } from "../../../config/entities/saison.config";

export default function SaisonPage() {
    return <CRUDPage 
    config={saisonConfig} />;
}