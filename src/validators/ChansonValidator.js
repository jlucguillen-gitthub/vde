import { BaseValidator } from "./BaseValidator";

export class ChansonValidator extends BaseValidator {

    validate(chanson) {
        this.errors = [];

        if (!chanson.titre) {
            this.addError("titre", "titre obligatoire");
        }


        return this.result();
    }
}