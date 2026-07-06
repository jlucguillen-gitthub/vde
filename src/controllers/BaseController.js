export class BaseController {

    constructor(service) {
        this.service = service;
    }

    async handle(serviceCall, { onSuccess, onError } = {}) {

        const res = await serviceCall();

        if (res.success) {
            onSuccess?.(res.data);
        } else {
            onError?.(res.errors);
        }

        return res;
    }

    async load(setState) {
        return this.handle(
            () => this.service.getAll(),
            {
                onSuccess: setState
            }
        );
    }

    async save(entity, onSuccess, onError) {
        return this.handle(
            () => this.service.save(entity),
            { onSuccess, onError }
        );
    }

    async delete(id, onSuccess, onError) {
        return this.handle(
            () => this.service.delete(id),
            { onSuccess, onError }
        );
    }

    async getById(id, onSuccess, onError) {
        return this.handle(
            () => this.service.getById(id),
            { onSuccess, onError }
        );
    }

}