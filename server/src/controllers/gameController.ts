import path from 'node:path';
import type { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.js';
import { Game } from '../models/models.js';
import type { FileRequest } from '../types/types.type.js';

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { title, price, description } = req.body;

        if (!title || !price || !description) {
            return next(ApiError.badRequest('Missing required fields: title, price, description, img'));
        }

        try {
            const imgReq = req as FileRequest;
            const img = imgReq.files.img;
            const fileName = `game${crypto.randomUUID()}.webp`;
            const filePath = path.resolve(process.cwd(), 'src', 'assets', 'img', fileName);
            await img.mv(filePath);

            const game = await Game.create({ title, price, description, img: fileName });
            return res.json(game);
        } catch (e) {
            return next(ApiError.internal(`Failed to create game: ${String(e)}`));
        }
    }

    async getAll(req: Request, res: Response) {
        const games = await Game.findAll();
        return res.json(games);
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const gameId = Array.isArray(id) ? id[0] : id;
            const game = await Game.findByPk(gameId);

            if (!game) {
                next(ApiError.notFound('Game not found'));
            }

            return res.json(game);
        } catch (error) {
            const err = error as Error;
            next(ApiError.internal(`Failed to fetch game: ${err.message}`));
        }
    }
}

export default new GameController();
