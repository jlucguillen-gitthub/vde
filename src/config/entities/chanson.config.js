import { createEntityConfig } from "./createEntityConfig";

import { ChansonRepository } from "../../repositories/ChansonRepository";
import { ChansonService } from "../../services/ChansonService";
import { ChansonValidator } from "../../validators/ChansonValidator";
import { ChansonMapper } from "../../mappers/ChansonMapper";


const columns = [
    {
        field: "titre",
        header: "Titre",
        type: "text",
        required: true
    },
    {
        field: "paroles",
        header: "Paroles",
        type: "text",
    }
];


export const chansonConfig = createEntityConfig({

    entity: "chanson",

    title: "🎵 les Chansons",

    table: "chansons",


    Repository: ChansonRepository,
    Service: ChansonService,
    Validator: ChansonValidator,
    Mapper: ChansonMapper,


    columns

});
