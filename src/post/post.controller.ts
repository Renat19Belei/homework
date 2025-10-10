import { Request, Response } from "express";
import * as postService from "./post.service";

export const getAllPosts = (req: Request, res: Response) => {
  const posts = postService.getAllPosts();
  res.json(posts);
};

export const getPostById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = postService.getPostById(id);
  post ? res.json(post) : res.status(404).json({ message: "Пост не знайдено" });
};

export const createPost = (req: Request, res: Response) => {
  const newPost = postService.createPost(req.body);
  res.status(201).json(newPost);
};

export const deletePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = postService.deletePost(id);
  deleted
    ? res.json({ message: "Пост видалено" })
    : res.status(404).json({ message: "Пост не знайдено" });
};
