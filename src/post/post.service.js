import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../../posts.json");

const readData = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getAllPosts = () => readData();

const getPostById = (id) => {
  const posts = readData();
  return posts.find((p) => p.id === Number(id));
};

const createPost = (post) => {
  const posts = readData();
  const newPost = { id: Date.now(), ...post };
  posts.push(newPost);
  writeData(posts);
  return newPost;
};

const updatePost = (id, updatedPost) => {
  const posts = readData();
  const index = posts.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...updatedPost };
  writeData(posts);
  return posts[index];
};

const deletePost = (id) => {
  const posts = readData();
  const index = posts.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;
  const deleted = posts.splice(index, 1);
  writeData(posts);
  return deleted[0];
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
