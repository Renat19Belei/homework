import fs from "fs";

const DATA_FILE = "./posts.json";

interface Post {
  id: number;
  title: string;
  content: string;
}

const readData = (): Post[] => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: Post[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export const getAllPosts = (): Post[] => readData();

export const getPostById = (id: number): Post | undefined => {
  const posts = readData();
  return posts.find((p) => p.id === id);
};

export const createPost = (postData: any) => {
  const posts = readData();
  const newPost = { id: Date.now(), ...postData };
  posts.push(newPost);
  writeData(posts);
  return newPost;
};

export const deletePost = (id: number): boolean => {
  const posts = readData();
  const updated = posts.filter((p) => p.id !== id);
  writeData(updated);
  return posts.length !== updated.length;
};
