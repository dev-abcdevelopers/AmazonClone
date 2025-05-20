import { Request, Response } from 'express';
import { prisma } from '../../config/db';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      res.status(400).json({ error: "Missing name/image" });
      return;
    }
    const category = await prisma.category.create({ data: { name, image } });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: (error as Error).message });
  }
};

export const getAllCategories = async (_: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: (error as Error).message });
  }
};
