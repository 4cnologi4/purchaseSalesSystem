import { ProductRepository } from '../repository/product.repository';
import { Product } from '../database/entities/Product';
import { ProductDto } from '../dtos/Product.dto';
import { CreateProductRequest } from '../requests/create-product.request';
import { UpdateProductRequest } from '../requests/update-product.request';
import { ResponseDTO } from '../dtos/Response.dto';
import { v4 as uuidv4 } from "uuid";

interface IProductService {
    getAllProducts: () => Promise<ResponseDTO>;
    getProductById: (id: string) => Promise<ResponseDTO>;
    createProduct: (productData: CreateProductRequest) => Promise<ResponseDTO>;
    updateProduct: (id: string, productData: UpdateProductRequest) => Promise<ResponseDTO>;
    deleteProduct: (id: string) => Promise<ResponseDTO>;
}

export const ProductService: IProductService = {
    getAllProducts: async (): Promise<ResponseDTO> => {
        try {
            const products = await ProductRepository.getAllProducts();
            const data: ProductDto[] = products.map(product => ({
                id: product.id,
                code: product.code,
                name: product.name,
                description: product.description,
                unitPrice: product.unit_price,
                isActive: product.is_active,
                unitOfMeasureId: product.unit_of_measure_id,
                createdByUserId: product.created_by_user_id,
                updatedByUserId: product.updated_by_user_id,
                createdAt: product.created_at?.toISOString(),
                updatedAt: product.updated_at?.toISOString(),
            }));
            return new ResponseDTO(true, 'Productos obtenidos exitosamente', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al obtener los productos', 500);
        }
    },

    getProductById: async (id: string): Promise<ResponseDTO> => {
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                return new ResponseDTO(false, 'Producto no encontrado', 404);
            }
            const data: ProductDto = {
                id: product.id,
                code: product.code,
                name: product.name,
                description: product.description,
                unitPrice: product.unit_price,
                isActive: product.is_active,
                unitOfMeasureId: product.unit_of_measure_id,
                createdByUserId: product.created_by_user_id,
                updatedByUserId: product.updated_by_user_id,
                createdAt: product.created_at?.toISOString(),
                updatedAt: product.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Producto obtenido exitosamente', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al obtener el producto', 500);
        }
    },

    createProduct: async (productData: CreateProductRequest): Promise<ResponseDTO> => {
        try {
            const productEntity: Partial<Product> = {
                id: uuidv4(),
                code: productData.code,
                name: productData.name,
                description: productData.description,
                unit_price: productData.unitPrice,
                is_active: true,
                unit_of_measure_id: productData.unitOfMeasureId,
                created_by_user_id: productData.createdByUserId,
                updated_by_user_id: productData.updatedByUserId,
            };

            const product = await ProductRepository.createProduct(productEntity);
            const data: ProductDto = {
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
            return new ResponseDTO(true, 'Producto creado exitosamente', 201, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al crear el producto', 500);
        }
    },

    updateProduct: async (id: string, productData: Partial<UpdateProductRequest>): Promise<ResponseDTO> => {
        try {
            const productEntity: Partial<Product> = {
                code: productData.code,
                name: productData.name,
                description: productData.description,
                unit_price: productData.unitPrice,
                unit_of_measure_id: productData.unitOfMeasureId,
                updated_by_user_id: productData.updatedByUserId,
            };

            const product = await ProductRepository.updateProduct(id, productEntity);
            if (!product) {
                return new ResponseDTO(false, 'Producto no encontrado', 404);
            }
            const data: ProductDto = {
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
            return new ResponseDTO(true, 'Producto actualizado exitosamente', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al actualizar el producto', 500);
        }
    },

    deleteProduct: async (id: string): Promise<ResponseDTO> => {
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                return new ResponseDTO(false, 'Producto no encontrado', 404);
            }
            await ProductRepository.deleteProduct(id);
            return new ResponseDTO(true, 'Producto desactivado exitosamente', 200);
        } catch (error) {
            return new ResponseDTO(false, 'Error al desactivar el producto', 500);
        }
    },
}; 