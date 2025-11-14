import { prisma } from "../../prisma/prisma.client";
import type { PostWithTags, CreatePostChecked, UpdatePostChecked } from "./post.types";

export class PostRepository {
  async getAllPosts(): Promise<PostWithTags[]> {
    return prisma.post.findMany({
      include: {
        tags: {
          include: { tag: true }
        }
      }
    });
  }

  async getPostById(id: number): Promise<PostWithTags | null> {
    return prisma.post.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true }
        }
      }
    });
  }

  async createPost(data: CreatePostChecked) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image ?? null,
        authorId: data.authorId,
        categoryId: data.categoryId ?? null,
      },
      include: {
        tags: {
          include: { tag: true }
        }
      }
    });
  }

  async updatePost(id: number, data: UpdatePostChecked) {
    try {
      return await prisma.post.update({
        where: { id },
        data,
        include: {
          tags: {
            include: { tag: true }
          }
        }
      });
    } catch (error: any) {
      if (error?.code === "P2025") return null;
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      return await prisma.post.delete({
        where: { id }
      });
    } catch (error: any) {
      if (error?.code === "P2025") return null;
      throw error;
    }
  }
}

export const postRepository = new PostRepository();
