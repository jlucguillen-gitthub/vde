import { BaseController } from "./BaseController";
import { SaisonService } from "../services/SaisonService";

export class SaisonController extends BaseController {

    constructor() {
        super(new SaisonService());
    }
  
    getActive(onSuccess, onError) {

        return this.handle(
            () => this.service.getActive(),
            { onSuccess, onError }
        );
    }
    // activate(saison, onSuccess, onError) {

    //     return this.handle(
    //         () => this.service.setActive(saison.id),
    //         {
    //             onSuccess: () => {

    //                 this.context.refresh();

    //                 onSuccess?.(saison);
    //             },
    //             onError
    //         }
    //     );
    // }
    activate(saison, onSuccess, onError) {

        return this.handle(
            () => this.service.setActive(saison.id),
            {
                onSuccess: () => {
                    this.context?.refresh();
                    onSuccess?.(saison);
                },
                onError
            }
        );
    }
    manageChanteurs(saison, load) {

        // window.location.href =
        //     `/admin/saisons/${saison.nom}/chanteurs`;
        console.log(
            "SaisonController.manageChanteurs",
            saison
        );
        this.context.updateSaisonSelectionne(saison);
        return(`/admin/${saison.nom}/chanteurs`);

    }

}