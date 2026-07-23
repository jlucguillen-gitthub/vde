/**
 * Gestion de :
 *  génération du token
 *  création d'un accès
 *  renouvellement
 *  récupération par token
 *  incrémentation du nombre de connexions
 * 
 * maybeSingle() est adapté ici :
1 ligne → retourne la ligne
0 ligne → retourne null
plusieurs lignes → erreur

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

    async findActiveBySaisonChanteur(saisonchanteurId) {

        const { data, error } = await this.supabase
            .from(this.table)
            .select("*")
            .eq("saison_chanteur_id", saisonchanteurId)
            .is("deleted_at", null)
            .eq("actif", true)
            .maybeSingle();

        return {
            data,
            error
        };
    }
}