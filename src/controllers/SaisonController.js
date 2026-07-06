import { BaseController } from "./BaseController";
import { SaisonService } from "../services/SaisonService";

export class SaisonController extends BaseController {

    constructor() {
        super(new SaisonService());
    }

    activate(id, onSuccess, onError) {
        return this.handle(
            () => this.service.setActive(id),
            { onSuccess, onError }
        );
    }

}