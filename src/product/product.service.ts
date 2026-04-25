import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: any[] = [];
  private idCounter = 1;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(p => p.id === id);
  }

  create(data: { name: string; price: number; categoryId: number }) {
    const newProd = { id: this.idCounter++, ...data };
    this.products.push(newProd);
    return newProd;
  }

  findByCategory(categoryId: number) {
    return this.products.filter(p => p.categoryId === categoryId);
  }
}
