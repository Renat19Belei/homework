import { PrismaClient, User } from "@prisma/client";
import { RegisterUserDTO } from "./user.types";

const prisma = new PrismaClient();


type UserWithoutPassword = Omit<User, 'password'>;


export class UserRepository {
  async findByEmailForAuth(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findByIdWithoutPassword(id: number): Promise<UserWithoutPassword | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        email: true,
        avatar: true,
        isAdmin: true,
        createdAt: true,

      }
    });
    return user as UserWithoutPassword | null;
  }

  async create(data: RegisterUserDTO & { password: string }) {
    return prisma.user.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        email: true,
        avatar: true,
        isAdmin: true,
        createdAt: true,
      }
    });
  }
}

export const userRepository = new UserRepository();