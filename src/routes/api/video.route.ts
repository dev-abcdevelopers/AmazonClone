import { Router } from 'express';
import { createVideo, getAllVideos } from '../../controllers/api/video.controller';

export const apiVideoRouter = Router();

apiVideoRouter.post('/', createVideo);
apiVideoRouter.get('/', getAllVideos);
