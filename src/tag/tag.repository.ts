import { prisma } from "../../prisma/prisma.client";
import { ITagRepository } from "./tag.repository.types";

export class TagRepository implements ITagRepository {
  async getAllTags(skip: number, take: number) {
    return prisma.tag.findMany({
      skip,
      take,
    });
  }

  async getTagById(id: number) {
    return prisma.tag.findUnique({
      where: { id },
    });
  }
}

export const tagRepository = new TagRepository();
