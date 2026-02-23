export class AmazonProductNotFoundError extends Error {
    constructor(asin: string) {
        super(`Producto no encontrado en Amazon para el ASIN ${asin}.`);
        this.name = 'AmazonProductNotFoundError';
    }
}

export class AmazonBlockedRequestError extends Error {
    constructor() {
        super('Amazon bloqueó temporalmente la solicitud (captcha o challenge).');
        this.name = 'AmazonBlockedRequestError';
    }
}

export class AmazonProductDataInvalidError extends Error {
    constructor(asin: string) {
        super(`Datos inválidos o incompletos para el ASIN ${asin}.`);
        this.name = 'AmazonProductDataInvalidError';
    }
}
