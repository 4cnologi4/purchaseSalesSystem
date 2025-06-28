import { ProductRepository } from '../repository/product.repository';
import { Product } from '../database/entities/Product';
import { ProductDto } from '../dtos/Product.dto';

interface IProductService {
    getAllProducts: () => Promise<ProductDto[]>;
    getProductById: (id: string) => Promise<ProductDto | null>;
    createProduct: (productData: Partial<Product>) => Promise<ProductDto>;
    updateProduct: (id: string, productData: Partial<Product>) => Promise<ProductDto | null>;
    deleteProduct: (id: string) => Promise<void>;
}

export const ProductService: IProductService = {
    getAllProducts: async (): Promise<ProductDto[]> => {
        const products = await ProductRepository.getAllProducts();
        return products.map(product => ({
            id: product.id,
            code: product.code,
            name: product.name,
            description: product.description,
            unitPrice: product.unit_price,
            unitOfMeasureId: product.unit_of_measure_id,
            createdByUserId: product.created_by_user_id,
            updatedByUserId: product.updated_by_user_id,
            createdAt: product.created_at?.toISOString(),
            updatedAt: product.updated_at?.toISOString(),
        }));
    },

    getProductById: async (id: string): Promise<ProductDto | null> => {
        const product = await ProductRepository.getProductById(id);
        if (product) {
            return {
                id: product.id,
                code: product.code,
                name: product.name,
                description: product.description,
                unitPrice: product.unit_price,
                unitOfMeasureId: product.unit_of_measure_id,
                createdByUserId: product.created_by_user_id,
                updatedByUserId: product.updated_by_user_id,
                createdAt: product.created_at?.toISOString(),
                updatedAt: product.updated_at?.toISOString(),
            };
        }
        return null;
    },

    createProduct: async (productData: Partial<Product>): Promise<ProductDto> => {
        const product = await ProductRepository.createProduct(productData);
        return {
            id: product.id,
            code: product.code,
            name: product.name,
            description: product.description,
            unitPrice: product.unit_price,
            unitOfMeasureId: product.unit_of_measure_id,
            createdByUserId: product.created_by_user_id,
            updatedByUserId: product.updated_by_user_id,
            createdAt: product.created_at?.toISOString(),
            updatedAt: product.updated_at?.toISOString(),
        };
    },

    updateProduct: async (id: string, productData: Partial<Product>): Promise<ProductDto | null> => {
        const product = await ProductRepository.updateProduct(id, productData);
        if (product) {
            return {
                id: product.id,
                code: product.code,
                name: product.name,
                description: product.description,
                unitPrice: product.unit_price,
                unitOfMeasureId: product.unit_of_measure_id,
                createdByUserId: product.created_by_user_id,
                updatedByUserId: product.updated_by_user_id,
                createdAt: product.created_at?.toISOString(),
                updatedAt: product.updated_at?.toISOString(),
            };
        }
        return null;
    },

    deleteProduct: async (id: string): Promise<void> => {
        return ProductRepository.deleteProduct(id);
    },
}; 