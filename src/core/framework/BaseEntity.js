export class BaseEntity {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}