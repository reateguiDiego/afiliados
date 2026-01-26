import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './infrastructure/persistence/prisma-product.repository';

@Module({
    providers: [
        {
            provide: 'IProductRepository',
            useClass: PrismaProductRepository,
        },
    ],
    exports: ['IProductRepository'],
})
export class ProductsModule { }
