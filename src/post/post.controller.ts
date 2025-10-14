import { Request, Response } from "express";
import * as postService from "./post.service";
import { CreatePostData, UpdatePostData } from "./post.types";

export const getAllPosts = (req: Request, res: Response): void => {
  const posts = postService.getAllPosts();
  res.json(posts);
};

export const getPostById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const post = postService.getPostById(id);

  if (!post) {
    res.status(404).json({ message: "Пост не знайдено" });
    return;
  }

  res.json(post);
};

export const createPost = (req: Request, res: Response): void => {
  const { title, content } = req.body as CreatePostData;

  if (typeof title !== "string" || typeof content !== "string") {
    res.status(400).json({ message: "Неправильны типи даних" });
    return;
  }

  const newPost = postService.createPost({ title, content });
  res.status(201).json(newPost);
};

export const updatePost = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { title, content } = req.body as UpdatePostData;

  if (title && typeof title !== "string") {
    res.status(400).json({ message: "Поле title має бути рядком" });
    return;
  }

  if (content && typeof content !== "string") {
    res.status(400).json({ message: "Поле content має бути рядком" });
    return;
  }

  const updated = postService.updatePost(id, { title, content });

  if (!updated) {
    res.status(404).json({ message: "Пост не знайдено" });
    return;
  }

  res.json(updated);
};

export const deletePost = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = postService.deletePost(id);

  if (!deleted) {
    res.status(404).json({ message: "Пост не знайбено" });
    return;
  }

  res.json({ message: "Пост видалено" });
};
