import { Request, Response } from "express";
import { postService } from "./post.service";
type CreatePostDTO = {
  title: string;
  content: string;
  image?: string;
  categoryId?: number | null;
};

export const postController = {
  async getAllPosts(_req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error("Controller getAllPosts error:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  },

  async getPostById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ message: "Невірний id" });

      const post = await postService.getPostById(id);
      if (!post) return res.status(404).json({ message: "Пост не знайдено" });
      res.json(post);
    } catch (error) {
      console.error("Controller getPostById error:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  },

  async createPost(req: Request, res: Response) {
    try {
      const { title, content, image, categoryId } = req.body as CreatePostDTO;
      const authorId = 1;

      if (!title || !content || !image) {
        return res.status(400).json({ message: "Всі ці поля обов'язкові (title, content, image)" });
      }

      const newPost = await postService.createPost({ title, content, image, authorId, categoryId: categoryId ?? null });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Controller createPost error:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  },

  async updatePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ message: "Невірний id" });

      const updated = await postService.updatePost(id, req.body);
      if (!updated) return res.status(404).json({ message: "Пост не знайдено" });
      res.json(updated);
    } catch (error) {
      console.error("Controller updatePost error:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ message: "Невірний id" });

      const deleted = await postService.deletePost(id);
      if (!deleted) return res.status(404).json({ message: "Пост не знайдено" });

      res.json(deleted);
    } catch (error) {
      console.error("Controller deletePost error:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
  },
};
