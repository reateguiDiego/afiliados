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

        const title = (await page.textContent('#productTitle'))?.trim() ?? '';
        const priceWhole = (await page.textContent('.a-price-whole'))?.trim() ?? '';
        const priceFraction = (await page.textContent('.a-price-fraction'))?.trim() ?? '';
        const priceRaw = priceFraction
            ? `${priceWhole}${priceFraction ? `.${priceFraction}` : ''}`
            : priceWhole;
        const imageUrl = (await page.getAttribute('#landingImage', 'src'))?.trim() ?? '';

        const price = this.parsePrice(priceRaw);

        if (!title || !imageUrl || !Number.isFinite(price)) {
            await browser.close();
            throw new Error('Producto inválido o incompleto.');
        }

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
}