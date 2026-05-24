import path from 'node:path';
import type { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.js';
import { Game, SystemRequirements } from '../models/models.js';
import type { FileRequest } from '../types/types.type.js';

class GameController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, price, description } = req.body;
            let { sysreqs } = req.body;

            if (!title || !price || !description) {
                return next(ApiError.badRequest('Missing required fields: title, price, description, sysreq'));
            }

            const imgReq = req as FileRequest;
            const img = imgReq.files.img;
            const fileName = `game${crypto.randomUUID()}.webp`;
            const filePath = path.resolve(process.cwd(), 'src', 'assets', 'img', fileName);
            await img.mv(filePath);

            const game = await Game.create({ title, price, description, img: fileName });
            const gameData = game.toJSON();

            sysreqs = JSON.parse(sysreqs);
            SystemRequirements.create({
                os: sysreqs.os,
                processor: sysreqs.processor,
                graphics: sysreqs.graphics,
                storage: sysreqs.storage,
                memory_RAM: sysreqs.memory_RAM,
                game_id: gameData.id,
            });

            return res.json(game);
        } catch (e) {
            return next(ApiError.internal(`Failed to create game: ${String(e)}`));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit } = req.query;

            if (limit) {
                const games = await Game.findAll({ limit: parseInt(limit as string, 10) });
                return res.json(games);
            }

            const games = await Game.findAll();
            return res.json(games);
        } catch (error) {
            const err = error as Error;
            next(ApiError.internal(`Failed to fetch games: ${err.message}`));
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const game = await Game.findOne({
                where: { id },
                include: [{ model: SystemRequirements, as: 'sysreqs' }],
            });

            if (!game) {
                return next(ApiError.notFound(`Game not found`));
            }

            return res.json(game);
        } catch (error) {
            const err = error as Error;
            next(ApiError.internal(`Failed to fetch game: ${err.message}`));
        }
    }
}

export default new GameController();
