import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ScrapeAmazonProductDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9]{10}$/)
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toUpperCase() : value
    )
    asin: string;
}