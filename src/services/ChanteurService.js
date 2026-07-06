import { BaseService } from "./BaseService";
import { supabase } from "../core/supabase/client";
import { BaseResponse } from "../core/framework/BaseResponse";
import { ChanteurMapper } from "../mappers/ChanteurMapper";
import { ChanteurValidator } from "../validators/ChanteurValidator";
import { ChanteurRepository } from "../repositories/ChanteurRepository";

const repo = new ChanteurRepository();
const validator = new ChanteurValidator();
export class ChanteurService extends BaseService {
    mapper = ChanteurMapper;

    constructor() {
        super(repo, validator);
    }

    async getAll(orderBy = "nom") {
        return super.getAll(orderBy);
    }



    // ⭐ spécifique métier
    async setActive(id) {

        const { error } = await supabase
            .rpc("set_active_saison", { p_id: id });

        if (error) {
            return BaseResponse.error([], error.message);
        }

        return BaseResponse.success(null, "Saison activée");
    }
}