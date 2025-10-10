import { Request, Response } from "express";
import * as userService from "./user.service";

export const getAllUsers = (req: Request, res: Response): void => {
  const users = userService.getAllUsers();
  res.json(users);
};

export const getUserById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Користувача не знайдено" });
  }
};

export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body as userService.CreateUser;


  if (!name || !email) {
    res.status(400).json({ message: "Треба вказати name та email" });
    return;
  }

  const newUser = userService.createUser({ name, email });
  res.status(201).json(newUser);
};
