import type { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.js';

const errorHandlerMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unknown error' });
};

export default errorHandlerMiddleware;
