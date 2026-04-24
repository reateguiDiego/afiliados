import { Injectable, Inject } from '@nestjs/common';
import { chromium } from 'playwright';
import type { IProductRepository } from '../../domain/repositories/product.repository';
import type { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Product } from '../../domain/entities/product.entity';
import { randomUUID } from 'crypto';
import {
    AmazonBlockedRequestError,
    AmazonCategoryNotConfiguredError,
    AmazonProductDataInvalidError,
    AmazonProductNotFoundError,
} from './amazon-scraper.errors';

const DEFAULT_CATEGORY_SLUG = 'general';

@Injectable()
export class AmazonScraper {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async scrapeAndSave(asin: string): Promise<Product> {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        try {
            await page.setExtraHTTPHeaders({ 'Accept-Language': 'es-ES,es;q=0.9' });

            const url = `https://www.amazon.es/dp/${asin}`;
            const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
            const bodyText = (await page.textContent('body'))?.toLowerCase() ?? '';
            const currentUrl = page.url().toLowerCase();
            const status = response?.status();

            if (
                status === 404 ||
                currentUrl.includes('/errors/404') ||
                bodyText.includes('no hemos podido encontrar esa página') ||
                bodyText.includes('currently unavailable')
            ) {
                throw new AmazonProductNotFoundError(asin);
            }

            if (
                currentUrl.includes('/errors/validatecaptcha') ||
                bodyText.includes('introduce los caracteres que ves a continuación') ||
                bodyText.includes('enter the characters you see below')
            ) {
                throw new AmazonBlockedRequestError();
            }

            const title = (await page.textContent('#productTitle'))?.trim() ?? '';
            const priceWhole = (await page.textContent('.a-price-whole'))?.trim() ?? '';
            const priceFraction = (await page.textContent('.a-price-fraction'))?.trim() ?? '';
            const imageUrl = (await page.getAttribute('#landingImage', 'src'))?.trim() ?? '';
            const priceRaw = priceWhole && priceFraction ? `${priceWhole}.${priceFraction}` : priceWhole;
            const price = this.parsePrice(priceRaw);

            if (!title || !imageUrl || !Number.isFinite(price) || price <= 0) {
                throw new AmazonProductDataInvalidError(asin);
            }

            const categoryId = await this.resolveDefaultCategoryId();

            const product = new Product(
                randomUUID(),
                asin,
                title,
                price,
                'EUR',
                imageUrl,
                url,
                categoryId,
                true
            );

            return await this.productRepository.save(product);
        } finally {
            await browser.close();
        }
    }

    private parsePrice(raw: string): number {
        const cleaned = raw.replace(/[^\d.,-]/g, '');
        
        if (!cleaned) return Number.NaN;

        let normalized = cleaned;

        if (normalized.includes(',') && normalized.includes('.')) {
            normalized = normalized.replace(/\./g, '').replace(',', '.');
        } else if (normalized.includes(',')) {
            normalized = normalized.replace(',', '.');
        }

        return Number.parseFloat(normalized);
    }

    private async resolveDefaultCategoryId(): Promise<string> {
        const categoryId = await this.categoryRepository.findIdBySlug(DEFAULT_CATEGORY_SLUG);

        if (!categoryId) {
            throw new AmazonCategoryNotConfiguredError(DEFAULT_CATEGORY_SLUG);
        }

        return categoryId;
    }
}
