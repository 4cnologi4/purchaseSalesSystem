import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseDTO } from '../dtos/Response.dto';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json(new ResponseDTO(false, 'Unauthorized: No token provided', 401, null));
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "");
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json(new ResponseDTO(false, 'Unauthorized: Invalid token', 401, null));
        return;
    }
}; 