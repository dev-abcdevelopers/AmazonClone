import { Request, Response } from "express";
import { prisma } from "../config/db";
import { PrismaClient, Category, Video, VideoOnCategory } from "../generated/prisma";


type CategoryWithVideos = Category & {
  videos: (VideoOnCategory & {
    video: Video
  })[]
};

export const getHomePage = async (_: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    include: {
      videos: {
        include: { video: true },
        orderBy: { order: 'asc' },
        take: 10,
      },
    },
    orderBy: { name: 'asc' },
  });

  const sliders = (categories as CategoryWithVideos[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    image: cat.image,
    videos: cat.videos.map((vc) => ({
      id: vc.video.id,
      title: vc.video.title,
      thumbnail: vc.video.thumbnail,
      description: vc.video.description,
      url: vc.video.url,
    })),
  }));

  res.json({ sliders });
};
