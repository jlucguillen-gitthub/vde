import { BaseService } from "./BaseService";
import { SaisonRepository } from "../repositories/SaisonRepository";
import { SaisonValidator } from "../validators/SaisonValidator";
import { supabase } from "../core/supabase/client";
import { BaseResponse } from "../core/framework/BaseResponse";
import { SaisonMapper } from "../mappers/SaisonMapper";

const repo = new SaisonRepository();
const validator = new SaisonValidator();
export class SaisonService extends BaseService {
    mapper = SaisonMapper;

    constructor() {
        super(repo, validator);
    }

    async getAll(orderBy = "date_debut") {

        const saisons = await this.repository.findAllActives(orderBy);

        return {
            success: true,
            data: saisons
        };
    }
    async getActive() {

        const { data, error } = await this.repository.findOneBy({
            active: true
        });
        if (error) {
            return BaseResponse.error([], error.message);
        }

        return BaseResponse.success(this.mapper.toUi(data));
    }

    // ⭐ spécifique métier
    async setActive(id) {

        console.log("et ici")
        const { error } = await supabase
            .rpc("set_active_saison", { p_id: id });

        if (error) {
            return BaseResponse.error([], error.message);
        }

        return BaseResponse.success(null, "Saison activée");
    }
}