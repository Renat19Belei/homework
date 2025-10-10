import fs from "fs";

const DATA_FILE = "./posts.json";

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface CreatePost {
  title: string;
  content: string;
}

const readData = (): Post[] => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data) as Post[];
};

const writeData = (data: Post[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export const getAllPosts = (): Post[] => {
  return readData();
};

export const getPostById = (id: number): Post | undefined => {
  const posts = readData();
  return posts.find(post => post.id === id);
};

export const createPost = (postData: CreatePost): Post => {
  const posts = readData();
  const newPost: Post = { id: Date.now(), ...postData };
  posts.push(newPost);
  writeData(posts);
  return newPost;
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

