import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateProductRequest } from '../requests/create-product.request';
import { UpdateProductRequest } from '../requests/update-product.request';

export const ProductController = {
    getAllProducts: async (req: Request, res: Response): Promise<void> => {
        const { search, code, name } = req.query;
        const response = await ProductService.getAllProducts({
            search: search as string,
            code: code as string,
            name: name as string
        });
        res.status(response.status).json(response);
    },

    getProductById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const response = await ProductService.getProductById(id);
        res.status(response.status).json(response);
    },

    createProduct: [
        validateRequest(CreateProductRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const response = await ProductService.createProduct({
                ...req.body,
                createdByUserId: userId,
                updatedByUserId: userId,
            });
            res.status(response.status).json(response);
        },
    ],

    updateProduct: [
        validateRequest(UpdateProductRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const { id } = req.params;
            const response = await ProductService.updateProduct(
                id,
                {
                    ...req.body,
                    updatedByUserId: userId,
                }
            );
            res.status(response.status).json(response);
        },
    ],

    deleteProduct: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const response = await ProductService.deleteProduct(id);
        res.status(response.status).json(response);
    },
}; 