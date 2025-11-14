import express from "express";
import { tagController } from "./tag.controller";

const router = express.Router();

router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getTagById);

export default router;
