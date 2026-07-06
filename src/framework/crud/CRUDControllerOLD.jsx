
import { BaseController } from "../../controllers/BaseController";
import { ServiceFactory } from "./ServiceFactory";

export class CRUDController {

    constructor(entity) {
        this.service = ServiceFactory.get(entity);
    }

    load(setState) {
        console.log("CRUDController.load", BaseController);
        console.log("CRUDController.load", this.service);
        return BaseController.load(this.service, setState);
    }

    save(form, onSuccess, onError) {
        return BaseController.handle(
            () => this.service.save(form),
            { onSuccess, onError }
        );
    }

    activate(id, onSuccess) {
        return BaseController.handle(
            () => this.service.setActive?.(id),
            { onSuccess }
        );
    }
}