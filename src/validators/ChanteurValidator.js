import { BaseValidator } from "./BaseValidator";

export class ChanteurValidator extends BaseValidator {

    validate(chanteur) {
        this.errors = [];

        if (!chanteur.nom) {
            this.addError("nom", "Nom obligatoire");
        }


        return this.result();
    }
}