
import { BaseController } from "../../controllers/BaseController";
const controller = new BaseController();
export const baseConfig = {
    entity: "à définir",
    title: "de base",
    table: "à dérfinir",
    controller: controller,

    columns: [
        {
            field: "active",
            header: "Active",
            type: "boolean",
            hideInForm: true,
            render: (v) => (v ? "⭐" : "")
        }
    ],

    actions: [
        { label: "✏️ Modifier", action: "edit" },
        { label: "🗑 Supprimer", action: "delete" }
    ],

    features: {
        search: true,
        pagination: true
    }
};