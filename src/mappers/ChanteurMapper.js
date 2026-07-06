export class ChanteurMapper {

    static toDb(form) {
        return {
            nom: form.nom,
            prenom: form.prénom,
            email: form.email,
            telephone: form.telephone,
        };
    }

    static toUi(db) {
        return {
            id: db.id,
            nom: db.nom,
            prénom: db.prenom,
            email: db.email,
            telephone: db.telephone
        };
    }
}