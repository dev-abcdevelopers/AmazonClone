import { Router } from 'express';
import { showVideoForm, handleVideoForm } from '../../controllers/admin/videoAdmin.controller';

export const adminVideoRouter = Router();

adminVideoRouter.get('/add', showVideoForm);
adminVideoRouter.post('/add', handleVideoForm);
