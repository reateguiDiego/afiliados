import { Product } from '../entities/product.entity';

export interface IProductRepository {
    // Amazon unique ID (ASIN)
    findByAsin(asin: string): Promise<Product | null>;

    save(product: Product): Promise<Product>;

    findByCategory(categorySlug: string): Promise<Product[]>;

    updatePrice(asin: string, price: number): Promise<void>;
}
