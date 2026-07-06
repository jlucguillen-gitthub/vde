import { supabase } from "../core/supabase/client";

export class BaseRepository {
    constructor(table) {
        this.table = table;
        this.supabase = supabase;
    }

    async findAll(orderBy = "created_at") {
        return this.supabase
            .from(this.table)
            .select("*")
            .order(orderBy, { ascending: true });
    }

    async insert(data) {
        return this.supabase.from(this.table).insert(data);
    }

    async update(id, data) {
        return this.supabase.from(this.table).update(data).eq("id", id).select(); // ⭐ IMPORTANT;
    }

    async findById(id) {
        return this.supabase.from(this.table).select("*").eq("id", id).single();
    }

    async delete(id) {
        return this.supabase.from(this.table).delete().eq("id", id);
    }
}