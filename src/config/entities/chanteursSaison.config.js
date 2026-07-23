import { ChanteursSaisonController } from "../../controllers/ChanteursSaisonController";
// import { SaisonChanteurController } from "../../controllers/SaisonChanteurController";
import { SaisonChanteurMapper } from "../../mappers/SaisonChanteurMapper";
import { baseConfig } from "./base.config";

const controller = new ChanteursSaisonController();
export const ChanteursSaisonConfig = {
    ...baseConfig,
    entity: "saisons",
    title: "la saison",
    table: "saisons",
    controller: controller,

    columns: [
        {
            field: "chanteur_id",
            header: "Chanteurs",
            type: "select",
            source: "availableChanteurs",
            render: (v, row) => {
                return `${row.chanteurs.nom} ${row.chanteurs.prenom}`
            }

        },
        {
            field: "mail",
            header: "E-mail",
            type: "text",
            // source: "availableChanteurs",
            render: (v, row) => {
                return `${row.chanteurs.email}`
            }

        },
        {
            field: "lien",
            header: "lien d'accès",
            type: "text",
            // source: "availableChanteurs",
            render: (v, row) => {
                // console.log(v)
                // console.log(row)
                console.log(row.acces)
                const token=row.acces.length ? row.acces[0].token : ''
                return `${token}`
            }

        },


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