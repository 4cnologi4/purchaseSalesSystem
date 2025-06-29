import { AppDataSource } from '../database/data-source';
import { Discount } from '../database/entities/Discount';

const discountRepository = AppDataSource.getRepository(Discount);

interface IDiscountRepository {
    getAllDiscounts: () => Promise<Discount[]>;
    getDiscountById: (id: string) => Promise<Discount | null>;
    createDiscount: (discountData: Partial<Discount>) => Promise<Discount>;
    updateDiscount: (id: string, discountData: Partial<Discount>) => Promise<Discount | null>;
    deleteDiscount: (id: string) => Promise<void>;
}

export const DiscountRepository: IDiscountRepository = {
    getAllDiscounts: async (): Promise<Discount[]> => {
        return discountRepository.find();
    },

    getDiscountById: async (id: string): Promise<Discount | null> => {
        return discountRepository.findOneBy({ id });
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
}; 