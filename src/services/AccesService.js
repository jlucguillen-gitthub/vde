/**
 * logique métier
 * generateLink(chanteur)
 * sendLink(chanteur)
 * invalidate()
 * renew()
 */
import { AccesRepository } from "../repositories/AccesRepository";

export class AccesService {

    constructor() {
        this.repository = new AccesRepository();
    }

    async generateLink(chanteur) {
        console.log("AccesService.generateLink", chanteur);
        const saisonId = chanteur.saison_id;

        // 1. chercher accès actif
        const { data: existing } =
            await this.repository.findActiveByChanteur(chanteur.id, saisonId);

        const now = new Date();
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 30);

        // 2. si existe ET pas expiré => on retourne
        if (existing && new Date(existing.date_expiration) > now) {
            return {
                token: existing.token,
                url: `${import.meta.env.VITE_APP_BASE_URL}/${existing.token}`,
                expiration: existing.date_expiration,
                created: false
            };
        }

        const token = crypto.randomUUID();

        // 3. si existe mais expiré => update
        if (existing) {

            const { data } = await this.repository.update(existing.id, {
                token,
                date_creation: now.toISOString(),
                date_expiration: expiration.toISOString(),
                nb_connexions: 0,
                derniere_connexion: null,
                actif: true
            });

            return {
                token,
                url: `${import.meta.env.VITE_APP_BASE_URL}/${token}`,
                expiration: expiration.toISOString(),
                created: false
            };
        }

        // 4. sinon insert
        const { data } = await this.repository.insert({
            chanteur_id: chanteur.id,
            saison_id: saisonId,
            token,
            date_creation: now.toISOString(),
            date_expiration: expiration.toISOString(),
            nb_connexions: 0,
            actif: true
        });

        return {
            token,
            url: `${import.meta.env.VITE_APP_BASE_URL}/${token}`,
            expiration: expiration.toISOString(),
            created: true
        };
    }
}