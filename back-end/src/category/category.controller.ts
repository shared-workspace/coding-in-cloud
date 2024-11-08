import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { RequestDtoCreateCategory } from './dto/create-category.dto';
import { RequestDtoDeleteCategory } from './dto/delete-category.dto';
import { ResponseDtoCategory } from './schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOkResponse({ type: RequestDtoCreateCategory })
  async createCategory(@Body() category: RequestDtoCreateCategory) {
    console.log('category', category);
    return await this.categoryService.createCategory(category.name);
  }

  @Delete()
  @ApiOkResponse({ type: ResponseDtoCategory })
  async deleteCategory(@Body() category: RequestDtoDeleteCategory) {
    console.log('category', category);
    return await this.categoryService.deleteCategory(category._id);
  }
}
