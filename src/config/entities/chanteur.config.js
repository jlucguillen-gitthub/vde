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
        {
            field: "acces_link",
            header: "Lien d'accès",
            type: "custom",
            hideInForm: true,
            render: (value, row) => {

                if (!row.acces || !row.acces.token) {
                    return "Aucun lien";
                }

                return `${import.meta.env.VITE_APP_BASE_URL}/${row.acces.token}`;
            }
        }
    ],
    actions: [
        ...baseConfig.actions,
        {
            label: "🔗 Générer lien",
            icon: "🔗",
            action: "generateAccessLink"
        },
        {
            label: "📋 Copier",
            icon: "📋",
            action: "copyAccessLink"
        },
        {
            label: "📩 Envoyer",
            icon: "📩",
            action: "sendAccessLink"
        }
    ]
};