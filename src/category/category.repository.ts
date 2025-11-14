import { prisma } from "../../prisma/prisma.client";



export class CategoryRepository {
  async getAll(skip: number, take: number) {
    return prisma.category.findMany({ skip, take });
  }

  async getById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(name: string) {
    return prisma.category.create({ data: { name } });
  }

  async update(id: number, name: string) {
    try {
      return await prisma.category.update({ where: { id }, data: { name } });
    } catch (error: any) {
      if (error.code === "P2025") return null;
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await prisma.category.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === "P2025") return null;
      throw error;
    }
  }
}

export const categoryRepository = new CategoryRepository();