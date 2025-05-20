import { Request, Response } from 'express';
import { prisma } from '../../config/db';

export const showVideoForm = async (_: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.render('video/create', { categories, error: null });
};

export const handleVideoForm = async (req: Request, res: Response) => {
  const { title, description, url, thumbnail, categoryIds, uploaderId } = req.body;
  if (!title || !url || !categoryIds?.length || !uploaderId) {
    const categories = await prisma.category.findMany();
    return res.render('video/create', { categories, error: "Missing required fields" });
  }
  await prisma.video.create({
    data: {
      title,
      description,
      url,
      thumbnail,
      uploaderId,
      categories: {
        create: Array.isArray(categoryIds)
          ? categoryIds.map((catId: string, i: number) => ({
              categoryId: catId,
              order: i,
            }))
          : [{ categoryId: categoryIds, order: 0 }],
      },
    },
  });
  res.redirect('/admin/video/add');
};
