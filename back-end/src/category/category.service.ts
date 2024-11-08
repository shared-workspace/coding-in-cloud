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

  async createCategory(name: string) {
    const res = await this.categoryModel.create({ name });
    if (res && res._id) {
      return {
        success: true,
        message: 'Category created successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'Category not created' };
    }
  }

  async deleteCategory(_id: any) {
    const res = await this.categoryModel.deleteOne({ _id });
    if (res.acknowledged && res.deletedCount) {
      return {
        success: true,
        message: 'Category deleted successfully',
      };
    } else {
      return { success: false, message: 'Category not deleted' };
    }
  }
}
