import { ChansonController } from "../../controllers/ChansonController";
import { ChansonMapper } from "../../mappers/ChansonMapper";
import { baseConfig } from "./base.config";

const controller = new ChansonController();
export const chansonConfig = {
    ...baseConfig,
    entity: "Chansons",
    title: "🎵 Chansons",
    table: "chansons",
    controller: controller,
    mapper: ChansonMapper,
    columns: [
        { field: "titre", header: "Titre", type: "text" },
        { field: "paroles", header: "Paroles", type: "text" },

    ],
    actions: [
        ...baseConfig.actions,

    ]
};