import { SaisonService } from "../../services/SaisonService";
// import { ChanteurService } from "../../services/ChanteurService";
// import { ConcertService } from "../../services/ConcertService";

export class ServiceFactory {

    static get(entity) {

        switch (entity) {

            case "saisons":
                return new SaisonService();

            case "chanteurs":
                return new ChanteurService();

            case "concerts":
                return new ConcertService();

            default:
                throw new Error("Service inconnu: " + entity);
        }
    }
}