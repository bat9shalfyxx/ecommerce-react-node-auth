import bcrypt from 'bcrypt';
import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import { Cart, User } from '../models/models.js';

const generateJWT = (id: number, email: string, role: string) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) throw new Error('SECRET_KEY is not defined in environment variables');
    const token = jwt.sign({ id, email, role }, secretKey, { expiresIn: '1d' });
    return token;
};

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password, role } = req.body;

            if (!email || !password || !username) {
                return next(ApiError.badRequest());
            }

            const existedUser = await User.findOne({ where: { email } });

            if (existedUser) {
                return next(ApiError.badRequest(`User with such email already exist`));
            }

            const hashedPassword = await bcrypt.hash(password, 4);
            const user = await User.create({ username, email, role, password: hashedPassword });
            const userData = user.toJSON();
            const cart = await Cart.create({ user_id: userData.id });
            console.assert(cart);

            const token = generateJWT(userData.id, userData.email, userData.role);

            return res.json({ token });
        } catch (err) {
            return next(ApiError.internal(`Unknown error: ${err as Error}`));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) return next(ApiError.notFound('There is no user with such email'));

            const userData = user.toJSON();
            const comparePassword = await bcrypt.compare(password, userData.password);

            if (!comparePassword) return next(ApiError.badRequest('Wrong password'));

            const token = generateJWT(userData.id, userData.email, userData.role);

            return res.json({ token });
        } catch (e) {
            return next(ApiError.internal(`Unknown error: ${e as Error}`));
        }
    }

    async check(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req as Request & { user: { id: number; email: string; role: string } };
            const token = generateJWT(request.user.id, request.user.email, request.user.role);
            return res.json({ token });
        } catch (e) {
            return next(ApiError.internal(`Unknown error: ${e as Error}`));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            return next(ApiError.internal(`Unknown error: ${e as Error}`));
        }
    }
}

export default new UserController();
