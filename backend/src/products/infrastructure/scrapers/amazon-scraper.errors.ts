export class AmazonProductNotFoundError extends Error {
    constructor(asin: string) {
        super(`Producto no encontrado en Amazon para el ASIN ${asin}.`);
        this.name = 'AmazonProductNotFoundError';
    }
}

export class AmazonBlockedRequestError extends Error {
    constructor() {
        super('Amazon bloqueo temporalmente la solicitud (captcha o challenge).');
        this.name = 'AmazonBlockedRequestError';
    }
}

export class AmazonProductDataInvalidError extends Error {
    constructor(asin: string) {
        super(`Datos invalidos o incompletos para el ASIN ${asin}.`);
        this.name = 'AmazonProductDataInvalidError';
    }
}

export class AmazonCategoryNotConfiguredError extends Error {
    constructor(slug: string) {
        super(`No existe una categoria configurada para el slug "${slug}".`);
        this.name = 'AmazonCategoryNotConfiguredError';
    }
}
