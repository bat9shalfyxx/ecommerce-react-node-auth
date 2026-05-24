import { Router } from 'express';
import cartRouter from './cartRouter.js';
import categoryRouter from './categoryRouter.js';
import gameRouter from './gameRouter.js';
import genreRouter from './genreRouter.js';
import sysreqsRouter from './sysreqsRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/game', gameRouter);
router.use('/genre', genreRouter);
router.use('/category', categoryRouter);
router.use('/system-requirements', sysreqsRouter);

export default router;
