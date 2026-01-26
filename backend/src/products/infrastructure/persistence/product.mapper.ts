import { Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../domain/entities/product.entity';

export class ProductMapper {
    static toDomain(prismaProduct: PrismaProduct): Product {
        return new Product(
            prismaProduct.id,
            prismaProduct.asin,
            prismaProduct.title,
            prismaProduct.price,
            prismaProduct.currency,
            prismaProduct.imageUrl,
            prismaProduct.affiliateUrl,
            prismaProduct.categoryId,
            prismaProduct.isAvailable,
            null, // Features
            null, // Rating
        );
    }
}