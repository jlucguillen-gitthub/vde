/**
 * le CRUD appelera ce controller pour gérer les accès
 */
import { AccesService } from "../services/AccesService";

export class AccesController {

    constructor() {
        this.service = new AccesService();
    }

    async generateLink(chanteur) {
        return this.service.generateLink(chanteur);
    }

}