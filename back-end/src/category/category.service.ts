import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async getCategories() {
    return await this.categoryModel.find();
  }

  async createCategory(name: string) {
    return await this.categoryModel.create({ name });
  }

  async deleteCategory(_id: any) {
    return (await this.categoryModel.deleteOne({ _id })).acknowledged;
  }
}
