export class Product {
    constructor(
        public readonly id: string,
        public readonly asin: string,
        public title: string,
        public price: number,
        public currency: string,
        public imageUrl: string,
        public affiliateUrl: string,
        public categoryId: string,
        public isAvailable: boolean,
        public features?: any,
        public rating?: number,
    ) { }
}
