import { PupitreController } from "../../controllers/PupitreController";
import { PupitreMapper } from "../../mappers/PupitreMapper";
import { PupitreRepository } from "../../repositories/PupitreRepository";
import { PupitreService } from "../../services/PupitreService";
import { PupitreValidator } from "../../validators/PupitreValidator";
import { baseConfig } from "./base.config";


const columns = [
    {
        field: "nom",
        header: "Nom",
        type: "text",
        required: true
    }
];

const table = "pupitres";
const repository = new PupitreRepository(table);
const validator = new PupitreValidator(columns);
const mapper = new PupitreMapper(columns);
const service = new PupitreService(
    repository,
    validator,
    mapper
);

const controller = new PupitreController(service);


export const pupitreConfig = {
    ...baseConfig,
    entity: "pupitres",
    title: "🎼 Pupitres",
    table,
    controller,
    columns
};