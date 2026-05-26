import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import {
  ICreateCategoryDto,
  IUpdateCategoryDto,
} from '../shared/interfaces/ICategoryDTO';

// @Injectable makes this class available for dependency injection
// meaning NestJS will automatically create and provide it where needed
@Injectable()
export class CategoriesService {
  constructor(
    // Injects the Category repository — our interface to the categories table
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Returns all categories ordered by name
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { name: 'ASC' },
    });
  }

  // Returns a single category by ID, throws 404 if not found
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  // Creates a new category, throws 409 if name already exists
  async create(dto: ICreateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(
        `Category with name "${dto.name}" already exists`,
      );
    }
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  // Updates an existing category by ID
  async update(id: number, dto: IUpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.categoryRepository.save(category);
  }

  // Deletes a category by ID
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
