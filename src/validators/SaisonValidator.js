import { BaseValidator } from "./BaseValidator";

export class SaisonValidator extends BaseValidator {


    validate(saison) {

        super.validate(saison);

        // règles spécifiques ici

        return this.result();
    }

    validateTODEL(saison) {
        this.errors = [];

        if (!saison.nom) {
            this.addError("nom", "Nom obligatoire");
        }

        if (saison.dateDebut && saison.dateFin) {
            if (new Date(saison.dateDebut) > new Date(saison.dateFin)) {
                this.addError(
                    "dateFin",
                    "La date de fin doit être >= date de début"
                );
            }
        }
        if (! saison.dateFin || saison.dateFin.length === 0) {
                this.addError(
                    "dateFin",
                    "La date de fin doit être renseignée"
                );
        }
        if (! saison.dateDebut || saison.dateDebut.length === 0) {
                this.addError(
                    "dateDebut",
                    "La date de début doit être renseignée"
                );
        }

        return this.result();
    }
}