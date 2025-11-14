import { prisma } from "../../prisma/prisma.client";
export class UserRepository {
  async create(name: string | undefined, email: string, password: string) {
    return prisma.user.create({
      data: { name, email, password },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async getAll() {
    return prisma.user.findMany();
  }
}

export const userRepository = new UserRepository();
