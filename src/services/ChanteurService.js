import { BaseService } from "./BaseService";
import { supabase } from "../core/supabase/client";
import { BaseResponse } from "../core/framework/BaseResponse";

export class ChanteurService extends BaseService {


    constructor(repository, validator= null, mapper= null) {
        super(repository, validator, mapper);
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