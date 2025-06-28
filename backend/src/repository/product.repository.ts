import { AppDataSource } from '../database/data-source';
import { Product } from '../database/entities/Product';

const productRepository = AppDataSource.getRepository(Product);

interface IProductRepository {
    getAllProducts: () => Promise<Product[]>;
    getProductById: (id: string) => Promise<Product | null>;
    createProduct: (productData: Partial<Product>) => Promise<Product>;
    updateProduct: (id: string, productData: Partial<Product>) => Promise<Product | null>;
    deleteProduct: (id: string) => Promise<void>;
}

export const ProductRepository: IProductRepository = {
    getAllProducts: async (): Promise<Product[]> => {
        return productRepository.find({ where: { is_active: true } });
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
}; 