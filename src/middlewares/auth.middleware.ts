import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface CustomRequest extends Request {
    userId?: number;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) { 
    return res.status(401).json({ message: 'Немає доступу. треба валідний токен 401' });
    }
    const token = authHeader.substring(7).trim();

    try {
        const secretKey = env.JWT_SECRET.toString();
        const decoded = jwt.verify(token, secretKey) as { id: number }; 

        req.userId = decoded.id; 
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Немає доступу. Невалідний токен 401' });
    }
};