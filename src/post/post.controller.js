import postService from "./post.service.js";

const getAllPosts = (req, res) => {
  const posts = postService.getAllPosts();
  res.json(posts);
};

const getPostById = (req, res) => {
  const post = postService.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Пост не знайдено" });
  }
  res.json(post);
};

const createPost = (req, res) => {
  const newPost = postService.createPost(req.body);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const updatedPost = postService.updatePost(req.params.id, req.body);
  if (!updatedPost) {
    return res.status(404).json({ message: "Пост не знайдено" });
  }
  res.json(updatedPost);
};

const deletePost = (req, res) => {
  const deletedPost = postService.deletePost(req.params.id);
  if (!deletedPost) {
    return res.status(404).json({ message: "Пост не знайдено" });
  }
  res.json({ message: "Пост видаленло" });
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
