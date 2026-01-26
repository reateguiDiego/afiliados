import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    SharedModule,
    ProductsModule
  ],
})
export class AppModule { }
