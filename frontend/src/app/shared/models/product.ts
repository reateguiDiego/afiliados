export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  asin: string;
  slug: string;
  title: string;
  brand: string;
  imageUrl: string;
  affiliateUrl: string;
  priceText?: string;
  specs?: ProductSpec[];
}