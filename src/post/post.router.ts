import express from "express";
import * as postController from "./post.controller";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);

export default router;
