import { Request, Response } from "express";
import { categoryService } from "./category.service";

export const categoryController = {
  async getAll(req: Request, res: Response) {
    try {
      const skip = Number(req.query.skip) || 0;
      const take = Number(req.query.take) || 10;
      const categories = await categoryService.getAll(skip, take);
      res.json(categories);
    } catch (e) {
      res.status(500).json({ message: "Помилка серверу" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await categoryService.getById(id);
      if (!category) return res.status(404).json({ message: "Не знайдено" });
      res.json(category);
    } catch (e) {
      res.status(500).json({ message: "Помилка серверу" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Введить ім'я" });
      const category = await categoryService.create(name);
      res.status(201).json(category);
    } catch (e) {
      res.status(500).json({ message: "Помилка серверу" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const updated = await categoryService.update(id, name);
      if (!updated) return res.status(404).json({ message: "Не знайдено" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Помилка серверу" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = await categoryService.delete(id);
      if (!deleted) return res.status(404).json({ message: "не знапйдено" });
      res.json(deleted);
    } catch (e) {
      res.status(500).json({ message: "Помилка серверу" });
    }
  },
};
