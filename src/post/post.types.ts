import { Request, Response } from "express";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}
export type CreatePostData = Omit<Post, "id">;
export type UpdatePostData = Partial<Omit<Post, "id">>;

export interface IPostService {

  getAllPosts(): Post[];
  getPostById(id: number): Post | undefined;
  createPost(data: CreatePostData): Post;
  updatePost(id: number, data: UpdatePostData): Post | undefined;
  deletePost(id: number): boolean;
}
export interface IPostController {
  getAllPosts(req: Request, res: Response): void;
  getPostById(req: Request, res: Response): void;
  createPost(req: Request, res: Response): void;
  updatePost(req: Request, res: Response): void;
  deletePost(req: Request, res: Response): void;
}
