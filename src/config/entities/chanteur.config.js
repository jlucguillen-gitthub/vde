import { createEntityConfig } from "./createEntityConfig";


import { ChanteurRepository } from "../../repositories/ChanteurRepository";
import { ChanteurService } from "../../services/ChanteurService";
import { ChanteurValidator } from "../../validators/ChanteurValidator";
import { ChanteurMapper } from "../../mappers/ChanteurMapper";


const entity = "chanteurs";
const title = "🎤 les Chanteurs";
const table = "chanteurs";
const columns = [
    { field: "nom", header: "Nom", type: "text", required: true },
    { field: "prenom", header: "Prénom", type: "text", required: true },
    { field: "email", header: "Email", type: "text", required: true },
    { field: "telephone", header: "Téléphone", type: "text", required: true },
    // {
    //     field: "acces_link",
    //     header: "Lien d'accès",
    //     type: "custom",
    //     hideInForm: true,
    //     render: (value, row) => {

    //         if (!row.acces || !row.acces.token) {
    //             return "Aucun lien";
    //         }

    //         return `${import.meta.env.VITE_APP_BASE_URL}/${row.acces.token}`;
    //     }
    // }
];


export const chanteurConfig = createEntityConfig({
    entity,
    title,
    table,
    Repository: ChanteurRepository,
    Service: ChanteurService,
    Validator: ChanteurValidator,
    Mapper: ChanteurMapper,
    // Controller: chanteurController
    columns,
    defaultOrderBy: "nom",
    actions: [
        { label: "✏️ Modifier", action: "edit" },
        { label: "⭐ Activer", action: "activate" },
        { label: "👥 Chanteurs", action: "manageChanteurs" },
        { label: "🗑 Supprimer", action: "delete" }
    ]    
});
