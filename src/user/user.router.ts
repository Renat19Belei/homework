import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
