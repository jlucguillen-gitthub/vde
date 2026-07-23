import { BaseMapper } from "./BaseMapper";
export class SaisonMapper  extends BaseMapper {
    constructor(columns) {
        super(columns);
    }
    // static toDb(form) {
    //     return {
    //         nom: form.nom,
    //         date_debut: form.dateDebut,
    //         date_fin: form.dateFin
    //     };
    // }

    // static toUi(db) {
    //     return {
    //         id: db.id,
    //         nom: db.nom,
    //         dateDebut: db.date_debut,
    //         dateFin: db.date_fin,
    //         active: db.active
    //     };
    // }
}