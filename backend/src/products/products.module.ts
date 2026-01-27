import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './infrastructure/persistence/prisma-product.repository';
import { AmazonScraper } from './infrastructure/scrapers/amazon.scraper';

@Module({
    providers: [
        {
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        },
        AmazonScraper,
    ],
    exports: ['IProductRepository'],
})
export class ProductsModule { }
