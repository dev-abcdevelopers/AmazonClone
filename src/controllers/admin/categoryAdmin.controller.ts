import { Request, Response } from 'express';
import { prisma } from '../../config/db';

export const showCategoryForm = (_: Request, res: Response): void => {
  res.render('category/create', { error: null, success: false });
};

export const handleCategoryForm = async (req: Request, res: Response): Promise<void> => {
  const { name, image } = req.body;
  if (!name || !image) {
    res.render('category/create', { error: "Missing name or image", success: false });
    return;
  }
  await prisma.category.create({ data: { name, image } });
  res.render('category/create', { error: null, success: true });
};

