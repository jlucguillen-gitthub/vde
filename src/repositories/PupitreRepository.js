import { BaseRepository } from "./BaseRepository";
import { supabase } from "../core/supabase/client";


export class PupitreRepository extends BaseRepository {

    constructor(table) {
        super( table);
    }

}