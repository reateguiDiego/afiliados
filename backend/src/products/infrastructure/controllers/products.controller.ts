import { Body, Controller, Post } from '@nestjs/common';
import { ScrapeAmazonProductUseCase } from '../../application/use-cases/scrape-amazon-product.use-case';
import { Product } from '../../domain/entities/product.entity';
import { ScrapeAmazonProductDto } from './dto/scrape-amazon-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly scrapeAmazonProduct: ScrapeAmazonProductUseCase) { }

    @Post('scrape')
    async scrapeAmazonProductByAsin(
        @Body() body: ScrapeAmazonProductDto
    ): Promise<Product> {
        return this.scrapeAmazonProduct.execute(body.asin);
    }
}
