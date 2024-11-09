import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { RequestDtoCreateCategory } from './dto/create-category.dto';
import { RequestDtoDeleteCategory } from './dto/delete-category.dto';
import { Category } from './schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  @ApiOkResponse({ type: [Category] })
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Post()
  @ApiCreatedResponse({ type: Category })
  async createCategory(@Body() category: RequestDtoCreateCategory) {
    console.log('category', category);
    return await this.categoryService.createCategory(category.name);
  }

  @Delete()
  @ApiOkResponse({ type: Boolean })
  async deleteCategory(@Body() category: RequestDtoDeleteCategory) {
    console.log('category', category);
    return await this.categoryService.deleteCategory(category._id);
  }
}
