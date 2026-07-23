import { createEntityConfig } from "./createEntityConfig";

import { RepetitionRepository } from "../../repositories/RepetitionRepository";
import { RepetitionService } from "../../services/RepetitionService";
import { RepetitionValidator } from "../../validators/RepetitionValidator";
import { RepetitionMapper } from "../../mappers/RepetitionMapper";


const columns = [
{ field: "titre", header: "Nom", type: "text", required: true },
{ field: "date_repetition", header: "Jour", type: "date" , required:true},
];

const actions= [
];


export const repetitionConfig = createEntityConfig({

    entity: "repetition",

    title: "🗓 les Répétitions",

    table: "repetitions",


    Repository: RepetitionRepository,
    Service: RepetitionService,
    Validator: RepetitionValidator,
    Mapper: RepetitionMapper,


    columns,
    actions

});
