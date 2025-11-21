import { postRepository } from "./post.repository";
import type { PostWithTags, CreatePostChecked, UpdatePostChecked } from "./post.types";

export class PostService {
  async getAllPosts(): Promise<PostWithTags[]> {
    return postRepository.getAllPosts();
  }

  async getPostById(id: number): Promise<PostWithTags | null> {
    return postRepository.getPostById(id);
  }

  async createPost(data: CreatePostChecked) {
    return postRepository.createPost(data);
  }

  async updatePost(id: number, data: UpdatePostChecked) {
    return postRepository.updatePost(id, data);
  }

  async deletePost(id: number) {
    return postRepository.deletePost(id);
  }
}

export const postService = new PostService();
