import { Injectable, Inject } from '@nestjs/common';
import { chromium } from 'playwright';
import type { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AmazonScraper {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
    ) { }

    async scrapeAndSave(asin: string): Promise<Product> {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.setExtraHTTPHeaders({ 'Accept-Language': 'es-ES,es;q=0.9' });

        const url = `https://www.amazon.es/dp/${asin}`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const title = await page.$eval('#productTitle', (el) => el.textContent?.trim() || '');
        const priceRaw = await page.$eval('.a-price-whole', (el) => el.textContent?.trim() || '0');
        const imageUrl = await page.$eval('#landingImage', (el) => (el as HTMLImageElement).src);

        const price = parseFloat(priceRaw.replace(',', '.'));

        const product = new Product(
            uuidv4(),
            asin,
            title,
            price,
            'EUR',
            imageUrl,
            url,
            'default-category-id',
            true
        );

        const savedProduct = await this.productRepository.save(product);

        await browser.close();
        return savedProduct;
    }
}