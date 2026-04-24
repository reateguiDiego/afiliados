import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './infrastructure/persistence/prisma-product.repository';
import { PrismaCategoryRepository } from './infrastructure/persistence/prisma-category.repository';
import { AmazonScraper } from './infrastructure/scrapers/amazon.scraper';
import { ScrapeAmazonProductUseCase } from './application/use-cases/scrape-amazon-product.use-case';
import { ProductsController } from './infrastructure/controllers/products.controller';

@Module({
    controllers: [ProductsController],
    providers: [
        {
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        },
        {
            provide: 'ICategoryRepository',
            useClass: PrismaCategoryRepository,
        },
        AmazonScraper,
        ScrapeAmazonProductUseCase,
    ],
    exports: ['IProductRepository', 'ICategoryRepository', ScrapeAmazonProductUseCase],
})
export class ProductsModule { }
