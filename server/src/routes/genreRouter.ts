import { Router } from 'express';
import GenreController from '../controllers/genreController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), GenreController.create);
router.get('/', GenreController.getAll);

export default router;
