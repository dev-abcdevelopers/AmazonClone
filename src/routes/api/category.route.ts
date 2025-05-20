import { Router } from 'express';
import { createCategory, getAllCategories } from '../../controllers/api/category.controller';

export const apiCategoryRouter = Router();

apiCategoryRouter.post('/', createCategory);
apiCategoryRouter.get('/', getAllCategories);
