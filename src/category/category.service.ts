import { categoryRepository } from "./category.repository";

export class CategoryService {
  async getAll(skip: number, take: number) {
    return categoryRepository.getAll(skip, take);
  }

  async getById(id: number) {
    return categoryRepository.getById(id);
  }

  async create(name: string) {
    return categoryRepository.create(name);
  }

  async update(id: number, name: string) {
    return categoryRepository.update(id, name);
  }

  async delete(id: number) {
    return categoryRepository.delete(id);
  }
}

export const categoryService = new CategoryService();
