export class BaseValidator {
    constructor() {
        this.errors = [];
    }

    addError(field, message) {
        this.errors.push({ field, message });
    }

    isValid() {
        return this.errors.length === 0;
    }

    result() {
        return {
            valid: this.isValid(),
            errors: this.errors
        };
    }
}