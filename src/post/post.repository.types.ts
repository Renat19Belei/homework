import { Post } from "@prisma/client";
import { PostWithTags, CreatePostChecked, UpdatePostChecked } from "./post.types";

export interface IPostRepository {
  getAllPosts(): Promise<PostWithTags[]>;
  getPostById(id: number): Promise<PostWithTags | null>;
  createPost(data: CreatePostChecked): Promise<Post>;
  updatePost(id: number, data: UpdatePostChecked): Promise<Post | null>;
  deletePost(id: number): Promise<Post | null>;
}
