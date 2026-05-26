import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import type { Category } from './category.entity';
import type {
  ICreateCategoryDto,
  IUpdateCategoryDto,
} from '../shared/interfaces/ICategoryDTO';

// All routes in this controller are prefixed with /categories
// e.g. GET /categories, POST /categories, PUT /categories/:id
@Controller('categories')
export class CategoriesController {
  constructor(
    // NestJS automatically injects the CategoriesService here
    private readonly categoriesService: CategoriesService,
  ) {}

  // GET /categories
  // Returns all categories
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  // GET /categories/:id
  // Returns a single category by ID
  // ParseIntPipe converts the :id string from the URL to a number
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  // POST /categories
  // Creates a new category — expects { name, type, description? } in the request body
  @Post()
  create(@Body() dto: ICreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto);
  }

  // PUT /categories/:id
  // Updates an existing category by ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: IUpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  // DELETE /categories/:id
  // Deletes a category by ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
