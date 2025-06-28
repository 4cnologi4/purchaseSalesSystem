import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseDTO } from '../dtos/Response.dto';

export const validateRequest = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dto = plainToInstance(dtoClass, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
            res.status(400).json(new ResponseDTO(false, 'Validation failed', 400, errorMessages));
            return; // Detiene la ejecución
        }

        req.body = dto;
        next(); // Continúa al siguiente middleware
    };
}; 