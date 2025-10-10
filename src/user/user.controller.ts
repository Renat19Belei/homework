import { Request, Response } from "express";
import * as userService from "./user.service";

export const getAllUsers = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);
  user ? res.json(user) : res.status(404).json({ message: "Користвучаа не знайдено" });
};

export const createUser = (req: Request, res: Response) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};
