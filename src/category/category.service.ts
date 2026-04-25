import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private categories: any[] = [];
  private idCounter = 1;

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(c => c.id === id);
  }

  create(data: { name: string }) {
    const newCat = { id: this.idCounter++, name: data.name };
    this.categories.push(newCat);
    return newCat;
  }
}
