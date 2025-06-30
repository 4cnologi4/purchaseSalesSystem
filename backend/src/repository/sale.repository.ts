import { AppDataSource } from '../database/data-source';
import { Sale } from '../database/entities/Sale';
import { SaleDetail } from '../database/entities/SaleDetail';

const saleRepository = AppDataSource.getRepository(Sale);
const saleDetailRepository = AppDataSource.getRepository(SaleDetail);

interface ISaleRepository {
    createSale: (saleData: Partial<Sale>) => Promise<Sale>;
    addSaleDetails: (saleId: string, details: Partial<SaleDetail>[]) => Promise<SaleDetail[]>;
    getSaleById: (id: string) => Promise<Sale | null>;
    updateSale: (id: string, saleData: Partial<Sale>) => Promise<Sale | null>;
    deleteSale: (id: string) => Promise<void>;
    getAllSales: (options?: { relations?: string[] }) => Promise<Sale[]>;
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
                saleId,
                unit_price,
                subtotal,
                discount,
                total,
                product_id: detail.product_id
            };
        });
        return saleDetailRepository.save(saleDetails);
    },

    getSaleById: async (id: string): Promise<Sale | null> => {
        return saleRepository.findOne({
            where: { id },
            relations: ["details"],
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
            relations: options?.relations || ["details"],
        });
    },
};
