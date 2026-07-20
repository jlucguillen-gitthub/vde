import { SaisonController } from "../../controllers/SaisonController";
import { SaisonMapper } from "../../mappers/SaisonMapper";
import { baseConfig } from "./base.config";

const controller = new SaisonController();
export const saisonConfig = {
       ...baseConfig,
    entity: "saisons",
    title: "📅 Saisons",
    table: "saisons",
    controller: controller,

    columns: [
        { field: "nom", header: "Nom", type: "text" },
        { field: "dateDebut", header: "Début", type: "date" },
        { field: "dateFin", header: "Fin", type: "date" },
        {
            field: "active",
            header: "Active",
            type: "boolean",
            hideInForm: true,
            render: (v) => (v ? "⭐" : "")
        }
    ],

    mapper: SaisonMapper,

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