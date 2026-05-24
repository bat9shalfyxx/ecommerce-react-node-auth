import { Router } from 'express';
import GameController from '../controllers/gameController.js';

const router = Router();

router.post('/', GameController.create);
router.get('/', GameController.getAll);
router.get('/:id', GameController.getOne);

export default router;
