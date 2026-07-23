import { BaseService } from "./BaseService";
import { PupitreMapper } from "../mappers/PupitreMapper";


export class PupitreService extends BaseService {

    constructor(repository, validator, mapper) {
        super(repository, validator, mapper);
    }

    async getAll(orderBy = "nom") {
        return super.getAll(orderBy);
    }

}