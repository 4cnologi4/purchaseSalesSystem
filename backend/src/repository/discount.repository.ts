import { AppDataSource } from '../database/data-source';
import { Discount } from '../database/entities/Discount';
import { Like } from 'typeorm';

const discountRepository = AppDataSource.getRepository(Discount);

interface IDiscountRepository {
    getAllDiscounts: (search?: string) => Promise<Discount[]>;
    getDiscountById: (id: string) => Promise<Discount | null>;
    createDiscount: (discountData: Partial<Discount>) => Promise<Discount>;
    updateDiscount: (id: string, discountData: Partial<Discount>) => Promise<Discount | null>;
    deleteDiscount: (id: string) => Promise<void>;
    hasActiveDiscount: (productId: string) => Promise<boolean>;
}

export const DiscountRepository: IDiscountRepository = {
    getAllDiscounts: async (search?: string): Promise<Discount[]> => {
        const query = discountRepository.createQueryBuilder('discount')
            .leftJoinAndSelect('discount.product', 'product');

        if (search) {
            query.where('product.name LIKE :search', { search: `%${search}%` });
        }

        return query.getMany();
    },

    getDiscountById: async (id: string): Promise<Discount | null> => {
        return discountRepository.findOne({
            where: { id },
            relations: ['product'],
            select: {
                product: {
                    id: true,
                    name: true,
                }
            }
        });
    },

    createDiscount: async (discountData: Partial<Discount>): Promise<Discount> => {
        const discount = discountRepository.create(discountData);
        return discountRepository.save(discount);
    },

    updateDiscount: async (id: string, discountData: Partial<Discount>): Promise<Discount | null> => {
        await discountRepository.update(id, discountData);
        return DiscountRepository.getDiscountById(id);
    },

    deleteDiscount: async (id: string): Promise<void> => {
        await discountRepository.update(id, { is_active: false });
    },

    hasActiveDiscount: async (productId: string): Promise<boolean> => {
        const count = await discountRepository.count({
            where: {
                product_id: productId
//                is_active: true,
            },
        });
        return count > 0;
    },
}; 