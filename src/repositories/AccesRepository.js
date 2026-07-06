/**
 * Gestion de :
 *  génération du token
 *  création d'un accès
 *  renouvellement
 *  récupération par token
 *  incrémentation du nombre de connexions
 */
import { BaseRepository } from "./BaseRepository";

export class AccesRepository extends BaseRepository {

    constructor() {
        super("acces");
    }

    async findByToken(token) {
        return this.supabase
            .from(this.table)
            .select("*")
            .eq("token", token)
            .single();
    }

    async findActiveByChanteur(chanteurId, saisonId) {
        return this.supabase
            .from(this.table)
            .select("*")
            .eq("chanteur_id", chanteurId)
            .eq("saison_id", saisonId)
            .is("deleted_at", null)
            .is("actif", true)
            .single();
    }

}