export interface ITagService {
  getAllTags(skip: number, take: number): Promise<any[]>;
  getTagById(id: number): Promise<any | null>;
}
