import { Request, Response } from 'express';
import { prisma } from '../../config/db';

export const createVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, url, thumbnail, categoryIds, uploaderId } = req.body;
    if (!title || !url || !categoryIds?.length || !uploaderId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        url,
        thumbnail,
        uploaderId,
        categories: {
          create: (categoryIds as string[]).map((catId: string, i: number) => ({
            categoryId: catId,
            order: i,
          })),
        },
      },
      include: {
        categories: true,
      },
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: (error as Error).message });
  }
};

export const getAllVideos = async (_: Request, res: Response): Promise<void> => {
  try {
    const videos = await prisma.video.findMany({
      include: {
        categories: {
          include: { category: true },
        },
      },
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: (error as Error).message });
  }
};
