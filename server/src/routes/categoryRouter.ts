import { Router } from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);

export default router;
