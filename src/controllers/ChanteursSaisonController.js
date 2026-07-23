import { ChanteurSaisonService } from "../services/ChanteurSaisonService";
import { ChanteurService } from "../services/ChanteurService";

import { AccesController } from "./AccesController";
import { BaseController } from "./BaseController";

export class ChanteursSaisonController extends BaseController {

    constructor() {
        // super(new ChanteurService());
        super(new ChanteurSaisonService());
        this.accesController = new AccesController();
    }



    /**
     * Liste les chanteurs d'une saison
     */
    async getBySaison(saisonId) {

        console.log(
            "SaisonChanteurController.getBySaison",
            saisonId
        );

        return this.service.getBySaison(saisonId);
    }
    async prepareCreate() {

        const saisonId = this.context.saisonId;

        const res = await this.service.getAvailableChanteurs(saisonId);

        if (!res.success) {
            return {};
        }

        return {
            availableChanteurs: res.data
        };
    }


    /**
     * Liste les chanteurs disponibles à ajouter
     */
    async getAvailableChanteurs(saisonId) {

        console.log(
            "SaisonChanteurController.getAvailableChanteurs",
            saisonId
        );

        return this.service.getAvailableChanteurs(saisonId);
    }



    /**
     * Ajouter un chanteur à une saison
     */
    async addChanteur(saisonId, chanteurId) {

        console.log(
            "SaisonChanteurController.addChanteur",
            {
                saisonId,
                chanteurId
            }
        );

        return this.service.addChanteur(
            saisonId,
            chanteurId
        );
    }



    /**
     * Retirer un chanteur d'une saison
     */
    async removeChanteur(id) {

        console.log(
            "SaisonChanteurController.removeChanteur",
            id
        );

        return this.service.removeChanteur(id);
    }

    generateAccessLink(saisonchanteur) {
        console.log("generateAccessLink", saisonchanteur);
        return this.accesController.generateLink(saisonchanteur);
    }
    copyAccessLink(saisonChanteurs) {
        console.log(saisonChanteurs)
        const token=saisonChanteurs.acces.length ? saisonChanteurs.acces[0].token : 'aucun accès généré'
        navigator.clipboard.writeText(token);
    }
    async sendAccessLink(saisonChanteurs) {
        const result = await this.accesController.generateLink(saisonChanteurs);

        // pour l'instant console (on fera email étape 9)
        console.log("Lien à envoyer :", result.url);

        return result;
    }

}