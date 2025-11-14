import { Tag } from "@prisma/client";

export interface ITagRepository {
  getAllTags(skip: number, take: number): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | null>;
}
