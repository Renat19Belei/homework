import { Request, Response } from "express";
import { userService } from "./user.service";

export const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.register({ name, email, password });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.json({ message: "Ви успішно увійшли", user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};
