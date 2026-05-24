import type { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.js';
import { Category } from '../models/models.js';

class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { title } = req.body;

        if (!title) {
            return next(ApiError.badRequest());
        }

        const category = await Category.create({ title });
        return res.json(category);
    }

    async getAll(req: Request, res: Response) {
        const categories = await Category.findAll();
        return res.json(categories);
    }

    // async deleteOne(req: Request, res: Response) {
    //     const {title} = req.body
    //     const category = await Category.
    // }
}

export default new CategoryController();
