import { BaseService } from "./BaseService";
import { supabase } from "../core/supabase/client";
import { BaseResponse } from "../core/framework/BaseResponse";
import { ChansonMapper } from "../mappers/ChansonMapper";
import { ChansonRepository } from "../repositories/ChansonRepository";
import { ChansonValidator } from "../validators/ChansonValidator";

const repo = new ChansonRepository();
const validator = new ChansonValidator();
export class ChansonService extends BaseService {
    mapper = ChansonMapper;

    constructor() {
        super(repo, validator);
    }

    async getAll(orderBy = "titre") {
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