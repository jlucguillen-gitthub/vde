import { createEntityConfig } from "./createEntityConfig";


import { SaisonChanteurMapper } from "../../mappers/SaisonChanteurMapper";

import { SaisonChanteurController } from "../../controllers/SaisonChanteurController";
import { SaisonChanteursValidator } from "../../validators/SaisonChanteursValidator";


const columns = [
    {
        field: "chanteur_id",
        header: "Chanteur",
        type: "select",
        source: "availableChanteurs",
        render: (v, row) => {
            return `${row.chanteurs.nom} ${row.chanteurs.prenom}`
        }

    }
];
const actions = [
    { label: "✏️ Modifier", action: "edit" },
    { label: "⭐ Activer", action: "activate" },
    // { label: "👥 Chanteurs", action: "manageChanteurs" },
    { label: "🗑 Supprimer", action: "delete" }
];

export const saisonChanteurConfig = createEntityConfig({
    entity: "saisons",
    title: "la saison",
    table: "saisons",
    controller: SaisonChanteurController,
    // Repository: SaisonChanteurRepository,
    // Service: SaisonChanteurSer,
    Validator: SaisonChanteursValidator,
    Mapper: SaisonChanteurMapper,

    // {
    //     field: "chanteurs",
    //     header: "Chanteurs multiple",
    //     type: "collectionCheckbox",
    //     source: "availableChanteurs",
    //     valueField: "id",
    //     labelField: "nom"
    // }



    // ⭐ hooks optionnels
    hooks: {
        beforeSave: (form) => {
            if (form.dateDebut > form.dateFin) {
                throw new Error("Dates invalides");
            }
            return form;
        }
    },
    columns,
    actions
    


});