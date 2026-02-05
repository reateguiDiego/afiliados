import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { AmazonScraper } from '../../infrastructure/scrapers/amazon.scraper';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ScrapeAmazonProductUseCase {
    constructor(private readonly amazonScraper: AmazonScraper) { }

    async execute(asin: string): Promise<Product> {
        const normalizedAsin = asin.trim().toUpperCase();

        if (!/^[A-Z0-9]{10}$/.test(normalizedAsin)) {
            throw new BadRequestException(
                'El ASIN debe tener 10 caracteres alfanuméricos.'
            );
        }

        try {
            return await this.amazonScraper.scrapeAndSave(normalizedAsin);
        } catch (error) {
            throw new InternalServerErrorException(
                `No se pudo obtener el producto (${normalizedAsin}).`
            );
        }
    }
}
