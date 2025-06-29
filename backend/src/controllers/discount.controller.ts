import { Request, Response } from 'express';
import { DiscountService } from '../services/discount.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateDiscountRequest } from '../requests/create-discount.request';
import { UpdateDiscountRequest } from '../requests/update-discount.request';

export const DiscountController = {
    getAllDiscounts: async (req: Request, res: Response): Promise<void> => {
        const response = await DiscountService.getAllDiscounts();
        res.status(response.status).json(response);
    },

    getDiscountById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const response = await DiscountService.getDiscountById(id);
        res.status(response.status).json(response);
    },

    createDiscount: [
        validateRequest(CreateDiscountRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const response = await DiscountService.createDiscount({
                ...req.body,
                createdByUserId: userId,
                updatedByUserId: userId,
            });
            res.status(response.status).json(response);
        },
    ],

    updateDiscount: [
        validateRequest(UpdateDiscountRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const { id } = req.params;
            const response = await DiscountService.updateDiscount(
                id,
                {
                    ...req.body,
                    updatedByUserId: userId,
                }
            );
            res.status(response.status).json(response);
        },
    ],

    deleteDiscount: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const response = await DiscountService.deleteDiscount(id);
        res.status(response.status).json(response);
    },
}; 