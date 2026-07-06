import { ChanteurController } from "../../controllers/ChanteurController";
import { ChanteurMapper } from "../../mappers/ChanteurMapper";
import { baseConfig } from "./base.config";

const controller = new ChanteurController();
export const chanteurConfig = {
    ...baseConfig,
    entity: "chanteurs",
    title: "🎤 Chanteurs",
    table: "chanteurs",
    controller: controller,
    mapper: ChanteurMapper,
    columns: [
        { field: "nom", header: "Nom", type: "text" },
        { field: "prénom", header: "Prénom", type: "text" },
        { field: "email", header: "Email", type: "text" },
        { field: "telephone", header: "Téléphone", type: "text" },
    ],    
};