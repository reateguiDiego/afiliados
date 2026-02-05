import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './infrastructure/persistence/prisma-product.repository';
import { AmazonScraper } from './infrastructure/scrapers/amazon.scraper';
import { ScrapeAmazonProductUseCase } from './application/use-cases/scrape-amazon-product.use-case';

@Module({
    providers: [
        {
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        },
        AmazonScraper,
        ScrapeAmazonProductUseCase,
    ],
    exports: ['IProductRepository', ScrapeAmazonProductUseCase],
})
export class ProductsModule { }
