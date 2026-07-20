import { SaisonChanteurController } from "../../controllers/SaisonChanteurController";
import { SaisonChanteurMapper } from "../../mappers/SaisonChanteurMapper";
import { baseConfig } from "./base.config";

const controller = new SaisonChanteurController();
export const saisonChanteurConfig = {
    ...baseConfig,
    entity: "saisons",
    title: "📅 la saison",
    table: "saisons",
    controller: controller,

    columns: [
        {
            field: "chanteur_id",
            header: "Chanteur",
            type: "select",
            source: "availableChanteurs"
        },
        // {
        //     field: "chanteurs",
        //     header: "Chanteurs multiple",
        //     type: "collectionCheckbox",
        //     source: "availableChanteurs",
        //     valueField: "id",
        //     labelField: "nom"
        // }
    ],

    mapper: SaisonChanteurMapper,

    // ⭐ hooks optionnels
    hooks: {
        beforeSave: (form) => {
            if (form.dateDebut > form.dateFin) {
                throw new Error("Dates invalides");
            }
            return form;
        }
    },

    // ⭐ actions custom (IMPORTANT)

    actions: [
        { label: "✏️ Modifier", action: "edit" },
        { label: "⭐ Activer", action: "activate" },
        { label: "👥 Chanteurs", action: "manageChanteurs" },
        { label: "🗑 Supprimer", action: "delete" }
    ]
};