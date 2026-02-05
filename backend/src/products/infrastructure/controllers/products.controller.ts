import { Body, Controller, Post } from '@nestjs/common';
import { ScrapeAmazonProductUseCase } from '../../application/use-cases/scrape-amazon-product.use-case';
import { Product } from '../../domain/entities/product.entity';

type ScrapeAmazonProductRequest = {
    asin: string;
};

@Controller('products')
export class ProductsController {
    constructor(private readonly scrapeAmazonProduct: ScrapeAmazonProductUseCase) { }

    @Post('scrape')
    async scrapeAmazonProductByAsin(
        @Body() body: ScrapeAmazonProductRequest
    ): Promise<Product> {
        return this.scrapeAmazonProduct.execute(body.asin ?? '');
    }
}
