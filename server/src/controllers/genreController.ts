import type { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.js';
import { Genre } from '../models/models.js';

class GenreController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { title } = req.body;

        if (!title) {
            return next(ApiError.badRequest());
        }

        const genre = await Genre.create({ title });
        return res.json(genre);
    }

    async getAll(req: Request, res: Response) {
        const genres = await Genre.findAll();
        return res.json(genres);
    }
}

export default new GenreController();
