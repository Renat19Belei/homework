import { ITagService } from "./tag.types";
import { tagRepository } from "./tag.repository";

export class TagService implements ITagService {
  async getAllTags(skip: number, take: number) {
    return tagRepository.getAllTags(skip, take);
  }

  async getTagById(id: number) {
    return tagRepository.getTagById(id);
  }
}

export const tagService = new TagService();
