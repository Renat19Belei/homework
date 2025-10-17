import { Request, Response } from "express";
import { postService } from "./post.service";
import { IPostController } from "./post.types";

export const postController: IPostController = {
  getAllPosts(_req: Request, res: Response) {
    const posts = postService.getAllPosts();
    res.json(posts);
  },

  getPostById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    res.json(post);
  },

  createPost(req: Request, res: Response) {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ message: "Всі ці поля обов'язкові" });
    }

    const post = postService.createPost({ title, description, image });
    res.status(201).json(post);
  },

  updatePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = postService.updatePost(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    res.json(updated);
  },

  deletePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = postService.deletePost(id);

    if (!deleted) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    res.status(204).send();
  },
};
