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
                return next(ApiError.badRequest('Missing required fields: title, price, description'));
            }

            const imgReq = req as FileRequest;
            const img = imgReq.files.img;
            const fileName = `game${crypto.randomUUID()}.webp`;
            const filePath = path.resolve(process.cwd(), 'src', 'assets', 'img', fileName);

            const game = await Game.create({ title, price, description, img: fileName });

            if (typeof sysreqs === 'string') {
                sysreqs = JSON.parse(sysreqs);
            } else {
                return next(ApiError.badRequest('Invalid system requirements format'));
            }

            if (game) await img.mv(filePath);

            await SystemRequirements.create({
                os: sysreqs.os,
                processor: sysreqs.processor,
                graphics: sysreqs.graphics,
                storage: sysreqs.storage,
                memory_RAM: sysreqs.memory_RAM,
                game_id: game.toJSON().id,
            });

            return res.json(game);
        } catch (err) {
            return next(ApiError.internal(`Failed to create game: ${err as Error}`));
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
        } catch (e) {
            return next(ApiError.internal(`Failed to fetch games: ${e as Error}`));
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
        } catch (e) {
            return next(ApiError.internal(`Failed to fetch game: ${e as Error}`));
        }
    }
}

export default new GameController();
