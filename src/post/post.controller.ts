import type { Request, Response } from "express";
import * as postService from "./post.service";

export const getAllPosts = (req: Request, res: Response): void => {
  const posts = postService.getAllPosts();
  res.json(posts);
};

export const getPostById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const post = postService.getPostById(id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Пост не знайдено" });
  }
};

export const createPost = (req: Request, res: Response): void => {
  const { title, content } = req.body as postService.CreatePost;

  if (!title || !content) {
    res.status(400).json({ message: "Ьреба вказати title та content" });
    return;
  }

  const newPost = postService.createPost({ title, content });
  res.status(201).json(newPost);
};

export const deletePost = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = postService.deletePost(id);

  if (deleted) {
    res.json({ message: "Пост видалено" });
  } else {
    res.status(404).json({ message: "Пост не знайдено" });
  }
};
