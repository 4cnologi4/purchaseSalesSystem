import { ProductRepository } from '../repository/product.repository';
import { Product } from '../database/entities/Product';
import { ProductDto } from '../dtos/Product.dto';
import { v4 as uuidv4 } from "uuid";
import { CreateProductRequest } from '../requests/create-product.request';
import { UpdateProductRequest } from '../requests/update-product.request';

interface IProductService {
    getAllProducts: () => Promise<ProductDto[]>;
    getProductById: (id: string) => Promise<ProductDto | null>;
    createProduct: (productData: ProductDto) => Promise<ProductDto>;
    updateProduct: (id: string, productData: Partial<ProductDto>) => Promise<ProductDto | null>;
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

    createProduct: async (productData: CreateProductRequest): Promise<ProductDto> => {
        const productEntity: Partial<Product> = {
            id: uuidv4(),
            code: productData.code,
            name: productData.name,
            description: productData.description,
            unit_price: productData.unitPrice,
            unit_of_measure_id: productData.unitOfMeasureId,
            created_by_user_id: productData.createdByUserId,
            updated_by_user_id: productData.updatedByUserId,
        };

        const product = await ProductRepository.createProduct(productEntity);

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

    updateProduct: async (id: string, productData: Partial<UpdateProductRequest>): Promise<ProductDto | null> => {
        const productEntity: Partial<Product> = {
            code: productData.code,
            name: productData.name,
            description: productData.description,
            unit_price: productData.unitPrice,
            unit_of_measure_id: productData.unitOfMeasureId,
            updated_by_user_id: productData.updatedByUserId,
        };

        const product = await ProductRepository.updateProduct(id, productEntity);

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