import { BaseValidator } from "./BaseValidator";


export class PupitreValidator extends BaseValidator {

    validate(pupitre) {

        super.validate(pupitre);

        // règles spécifiques ici

        return this.result();
    }

}