import { BaseRepository } from "./BaseRepository";
import { supabase } from "../core/supabase/client";

export class SaisonRepository extends BaseRepository {

    constructor(table) {
        super(table);
    }

    async findAllActives(orderBy = "date_debut") {

        const { data, error } = await supabase
            .from("saisons")
            .select("*")
            // .not("deleted_at", "is", null)
            .is("deleted_at", null)
            .order(orderBy, { ascending: true })
            ;

        if (error) {
            throw error;
        }

        return data;
    }
    setActive(id) {
        return supabase.rpc(
            "set_active_saison",
            { p_id: id }
        );
    }

}