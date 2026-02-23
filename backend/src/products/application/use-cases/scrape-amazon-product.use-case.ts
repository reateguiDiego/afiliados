import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { AmazonScraper } from '../../infrastructure/scrapers/amazon.scraper';
import { Product } from '../../domain/entities/product.entity';
import {
    AmazonBlockedRequestError,
    AmazonProductDataInvalidError,
    AmazonProductNotFoundError,
} from '../../infrastructure/scrapers/amazon-scraper.errors';

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
            if (error instanceof AmazonProductNotFoundError) {
                throw new NotFoundException(error.message);
            }

            if (error instanceof AmazonBlockedRequestError) {
                throw new ServiceUnavailableException(error.message);
            }

            if (error instanceof AmazonProductDataInvalidError) {
                throw new UnprocessableEntityException(error.message);
            }

            throw new InternalServerErrorException(
                `No se pudo obtener el producto (${normalizedAsin}).`
            );
        }
    }
}
