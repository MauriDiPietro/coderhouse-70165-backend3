import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  products: Product[];
  constructor(){
    this.products = [];
  }
  create(createProductDto: CreateProductDto): CreateProductDto {
    this.products.push({
      id: Math.random().toString(),
      ...createProductDto
    });
    return createProductDto;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product | undefined {
    return this.products.find((prod) => prod.id === id);
  }

  remove(id: string): Product[] {
    return this.products.filter((prod) => prod.id !== id);
  }
}
