export class ChansonMapper {

    static toDb(form) {
        console.log(form)
        return {
            titre: form.titre,
            paroles: form.paroles,
        };
    }

    static toUi(db) {
        return {
            id: db.id,
            titre: db.titre,
            paroles: db.paroles,
        };
    }
}