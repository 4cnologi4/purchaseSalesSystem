import { AppDataSource } from '../database/data-source';
import { Product } from '../database/entities/Product';
import { FindOptionsWhere, Like, Brackets } from 'typeorm';

const productRepository = AppDataSource.getRepository(Product);

interface IProductRepository {
    getAllProducts: (where?: FindOptionsWhere<Product>) => Promise<Product[]>;
    getProductById: (id: string) => Promise<Product | null>;
    createProduct: (productData: Partial<Product>) => Promise<Product>;
    updateProduct: (id: string, productData: Partial<Product>) => Promise<Product | null>;
    deleteProduct: (id: string) => Promise<void>;
    searchProducts: (options?: { search?: string; code?: string; name?: string }) => Promise<Product[]>;
}

export const ProductRepository: IProductRepository = {
    getAllProducts: async (where?: FindOptionsWhere<Product>): Promise<Product[]> => {
        const defaultWhere = { is_active: true };
        return productRepository.find({ 
            where: where ? { ...defaultWhere, ...where } : defaultWhere 
        });
    },

    getProductById: async (id: string): Promise<Product | null> => {
        return productRepository.findOneBy({ id, is_active: true });
    },

    createProduct: async (productData: Partial<Product>): Promise<Product> => {
        const product = productRepository.create(productData);
        return productRepository.save(product);
    },

    updateProduct: async (id: string, productData: Partial<Product>): Promise<Product | null> => {
        await productRepository.update(id, productData);
        return ProductRepository.getProductById(id);
    },

    deleteProduct: async (id: string): Promise<void> => {
        await productRepository.update(id, { is_active: false });
    },

    searchProducts: async (options?: { search?: string; code?: string; name?: string }): Promise<Product[]> => {
        const queryBuilder = productRepository.createQueryBuilder('product')
            .where('product.is_active = :isActive', { isActive: true });

        if (options?.search) {
            const searchTerm = `%${options.search.replace(/\s+/g, '%')}%`;
            queryBuilder.andWhere(
                new Brackets(qb => {
                    qb.where('product.name LIKE :search', { search: searchTerm })
                        .orWhere('product.code LIKE :search', { search: searchTerm });
                })
            );
        } else {
            if (options?.code) {
                queryBuilder.andWhere('product.code LIKE :code', {
                    code: `%${options.code.replace(/\s+/g, '%')}%`
                });
            }
            if (options?.name) {
                queryBuilder.andWhere('product.name LIKE :name', {
                    name: `%${options.name.replace(/\s+/g, '%')}%`
                });
            }
        }

        return queryBuilder.getMany();
    },
}; 