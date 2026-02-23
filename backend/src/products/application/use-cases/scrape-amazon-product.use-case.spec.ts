import {
    NotFoundException,
    ServiceUnavailableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ScrapeAmazonProductUseCase } from './scrape-amazon-product.use-case';
import {
    AmazonBlockedRequestError,
    AmazonProductDataInvalidError,
    AmazonProductNotFoundError,
} from '../../infrastructure/scrapers/amazon-scraper.errors';

describe('ScrapeAmazonProductUseCase', () => {
    it('maps product not found error to NotFoundException', async () => {
        const scraperMock = {
            scrapeAndSave: jest.fn().mockRejectedValue(new AmazonProductNotFoundError('B012345678')),
        } as any;

        const useCase = new ScrapeAmazonProductUseCase(scraperMock);

        await expect(useCase.execute('B012345678')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('maps blocked request error to ServiceUnavailableException', async () => {
        const scraperMock = {
            scrapeAndSave: jest.fn().mockRejectedValue(new AmazonBlockedRequestError()),
        } as any;

        const useCase = new ScrapeAmazonProductUseCase(scraperMock);

        await expect(useCase.execute('B012345678')).rejects.toBeInstanceOf(ServiceUnavailableException);
    });

    it('maps invalid product data to UnprocessableEntityException', async () => {
        const scraperMock = {
            scrapeAndSave: jest.fn().mockRejectedValue(new AmazonProductDataInvalidError('B012345678')),
        } as any;

        const useCase = new ScrapeAmazonProductUseCase(scraperMock);

        await expect(useCase.execute('B012345678')).rejects.toBeInstanceOf(UnprocessableEntityException);
    });
});
