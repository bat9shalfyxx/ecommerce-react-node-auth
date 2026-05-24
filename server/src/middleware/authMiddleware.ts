import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') return next();

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'User is unauthorized' });

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) throw new Error('SECRET_KEY is not defined in environment variables');

        const verifiedToken = jwt.verify(token, secretKey);

        const request = req as (Request & { user: { id: number; email: string; role: string } }) | JwtPayload;
        request.user = verifiedToken;

        return next();
    } catch (err) {
        return res.status(401).json({ message: `User is unauthorized: ${err as Error}` });
    }
};

export default authMiddleware;
