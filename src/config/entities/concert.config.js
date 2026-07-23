import { createEntityConfig } from "./createEntityConfig";

import { ConcertRepository } from "../../repositories/ConcertRepository";
import { ConcertService } from "../../services/ConcertService";
import { ConcertValidator } from "../../validators/ConcertValidator";
import { ConcertMapper } from "../../mappers/ConcertMapper";


const columns = [
        { field: "titre", header: "Nom", type: "text" },
        { field: "date_concert", header: "Date", type: "date" },
];


export const concertConfig = createEntityConfig({

    entity: "concert",

    title: "🎤 les Concerts",

    table: "concerts",


    Repository: ConcertRepository,
    Service: ConcertService,
    Validator: ConcertValidator,
    Mapper: ConcertMapper,


    columns

});
