import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from './product.mapper';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByAsin(asin: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: { asin },
        });

        if (!product) return null;
        return ProductMapper.toDomain(product);
    }

    async save(product: Product): Promise<Product> {
        // Upsert: Si existe actualiza, si no crea
        const savedProduct = await this.prisma.product.upsert({
            where: { asin: product.asin },
            update: {
                title: product.title,
                price: product.price,
                isAvailable: product.isAvailable,
                updatedAt: new Date(),
            },
            create: {
                asin: product.asin,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                affiliateUrl: product.affiliateUrl,
                categoryId: product.categoryId,
                currency: product.currency,
                isAvailable: product.isAvailable,
            },
        });

        return ProductMapper.toDomain(savedProduct);
    }

    async findByCategory(categorySlug: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug,
                },
            },
        });

        return products.map((p) => ProductMapper.toDomain(p));
    }

    async updatePrice(asin: string, price: number): Promise<void> {
        await this.prisma.product.update({
            where: { asin },
            data: { price },
        });
    }
}