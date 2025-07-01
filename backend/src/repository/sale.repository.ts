import { AppDataSource } from '../database/data-source';
import { Sale } from '../database/entities/Sale';
import { SaleDetail } from '../database/entities/SaleDetail';
import { Discount } from '../database/entities/Discount';

const saleRepository = AppDataSource.getRepository(Sale);
const saleDetailRepository = AppDataSource.getRepository(SaleDetail);

interface ISaleRepository {
    createSale: (saleData: Partial<Sale>) => Promise<Sale>;
    addSaleDetails: (saleId: string, details: Partial<SaleDetail>[]) => Promise<SaleDetail[]>;
    getSaleById: (id: string) => Promise<Sale | null>;
    updateSale: (id: string, saleData: Partial<Sale>) => Promise<Sale | null>;
    deleteSale: (id: string) => Promise<void>;
    getAllSales: (options?: { relations?: string[] }) => Promise<Sale[]>;
    getDiscountByProductId: (productId: string) => Promise<Discount | null>;
}

export const SaleRepository: ISaleRepository = {
    createSale: async (saleData: Partial<Sale>): Promise<Sale> => {
        const sale = saleRepository.create(saleData);
        return saleRepository.save(sale);
    },

    addSaleDetails: async (saleId: string, details: Partial<SaleDetail>[]): Promise<SaleDetail[]> => {
        const saleDetails = details.map((detail: any) => {
            const unit_price = detail.unit_price || 0;
            const subtotal = detail.quantity * unit_price;
            const discount = detail.discount || 0;
            const total = subtotal - (subtotal * discount) / 100;

            return {
                ...detail,
                sale: { id: saleId },
                unit_price,
                subtotal,
                discount,
                total,
                product: { id: detail.product_id }
            };
        });
        return saleDetailRepository.save(saleDetails);
    },

    getSaleById: async (id: string): Promise<Sale | null> => {
        return saleRepository.findOne({
            where: { id },
            relations: ["details", "details.product"],
        });
    },

    updateSale: async (id: string, saleData: Partial<Sale>): Promise<Sale | null> => {
        await saleRepository.update(id, saleData);
        return SaleRepository.getSaleById(id);
    },

    deleteSale: async (id: string): Promise<void> => {
        await saleRepository.delete(id);
    },

    getAllSales: async (options?: { relations?: string[] }): Promise<Sale[]> => {
        return saleRepository.find({
            relations: options?.relations || ["details", "details.product"],
            order: { created_at: "DESC" }
        });
    },

    getDiscountByProductId: async (productId: string): Promise<Discount | null> => {
        const discount = await AppDataSource.getRepository(Discount)
            .findOne({ 
                where: { product_id: productId, is_active: true },
            });
        return discount;
    },
};
