import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export const ProductController = {
    getAllProducts: async (req: Request, res: Response) => {
        const products = await ProductService.getAllProducts();
        res.json(products);
    },

    getProductById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        res.json(product);
    },

    createProduct: async (req: Request, res: Response) => {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    },

    updateProduct: async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await ProductService.updateProduct(id, req.body);
        res.json(product);
    },

    deleteProduct: async (req: Request, res: Response) => {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(204).send();
    },
}; 