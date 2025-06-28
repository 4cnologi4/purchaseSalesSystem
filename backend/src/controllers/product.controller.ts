import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateProductRequest } from '../requests/create-product.request';
import { UpdateProductRequest } from '../requests/update-product.request';

export const ProductController = {
    getAllProducts: async (req: Request, res: Response): Promise<void> => {
        const products = await ProductService.getAllProducts();
        res.json(products);
    },

    getProductById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        res.json(product);
    },

    createProduct: [
        validateRequest(CreateProductRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const product = await ProductService.createProduct({
                ...req.body,
                createdByUserId: userId,
                updatedByUserId: userId,
            });
            res.status(201).json(product);
        },
    ],

    updateProduct: [
        validateRequest(UpdateProductRequest),
        async (req: Request, res: Response): Promise<void> => {
            const userId = (req as any).user.id;
            const { id } = req.params;
            const product = await ProductService.updateProduct(
                id,
                {
                    ...req.body,
                    updatedByUserId: userId,
                }
            );
            res.json(product);
        },
    ],

    deleteProduct: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const result = await ProductService.deleteProduct(id);
        
        if (!result.success) {
            res.status(404).json({ message: result.message });
            return;
        }

        res.status(200).json({ message: result.message });
    },
}; 