import { Router } from 'express';
import { showCategoryForm, handleCategoryForm } from '../../controllers/admin/categoryAdmin.controller';

export const adminCategoryRouter = Router();

adminCategoryRouter.get('/add', showCategoryForm);
adminCategoryRouter.post('/add', handleCategoryForm);
