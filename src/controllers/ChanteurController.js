import { ChanteurService } from "../services/ChanteurService";
import { BaseController } from "./BaseController";

export class ChanteurController extends BaseController {

    constructor() {
        super(new ChanteurService());
    }

    activate(id, onSuccess, onError) {
        return this.handle(
            () => this.service.setActive(id),
            { onSuccess, onError }
        );
    }

}