import fs from "fs";
import { Post, CreatePostData, UpdatePostData } from "./post.types";

const DATA_FILE = "./posts.json";

const readData = (): Post[] => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data) as Post[];
};

const writeData = (data: Post[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export const getAllPosts = (): Post[] => readData();

export const getPostById = (id: number): Post | undefined => {
  const posts = readData();
  return posts.find(post => post.id === id);
};

export const createPost = (postData: CreatePostData): Post => {
  const posts = readData();
  const newPost: Post = { id: Date.now(), ...postData };
  posts.push(newPost);
  writeData(posts);
  return newPost;
};

export const updatePost = (id: number, data: UpdatePostData): Post | undefined => {
  const posts = readData();
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) return undefined;

  posts[index] = { ...posts[index], ...data };
  writeData(posts);

  return posts[index];
};

export const deletePost = (id: number): boolean => {
  const posts = readData();
  const filtered = posts.filter(post => post.id !== id);

  if (filtered.length === posts.length) {
    return false;
  }

  writeData(filtered);
  return true;
};
