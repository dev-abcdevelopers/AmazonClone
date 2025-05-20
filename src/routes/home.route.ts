import { Router } from 'express';
import { getHomePage } from '../controllers/home.controller';

export const homeRouter = Router();

homeRouter.get('/', getHomePage);
