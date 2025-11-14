import { Request, Response } from "express";
import { tagService } from "./tag.service";

export const tagController = {
  async getAllTags(req: Request, res: Response) {
    try {
      const skip = Number(req.query.skip) || 0;
      const take = Number(req.query.take) || 10;

      const tags = await tagService.getAllTags(skip, take);
      res.json(tags);
    } catch (error) {
      console.error("getAllTags error:", error);
      res.status(500).json({ message: "помилкаа сервера" });
    }
  },

  async getTagById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Невірний ID" });
      }

      const tag = await tagService.getTagById(id);
      if (!tag) {
        return res.status(404).json({ message: "Тег не знадйено" });
      }

      res.json(tag);
    } catch (error) {
      console.error("getTagById error:", error);
      res.status(500).json({ message: "Помилка серверу" });
    }
  },
};
