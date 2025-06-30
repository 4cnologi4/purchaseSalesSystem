import { SaleRepository } from '../repository/sale.repository';
import { SaleDto, SaleDetailDto } from '../dtos/Sale.dto';
import { CreateSaleRequest } from '../requests/create-sale-request';
import { UpdateSaleRequest } from '../requests/update-sale.request';
import { ResponseDTO } from '../dtos/Response.dto';
import { DiscountService } from '../services/discount.service';

interface ISaleService {
    createSale: (saleData: CreateSaleRequest) => Promise<ResponseDTO>;
    getSaleById: (id: string) => Promise<ResponseDTO>;
    updateSale: (id: string, saleData: UpdateSaleRequest) => Promise<ResponseDTO>;
    deleteSale: (id: string) => Promise<ResponseDTO>;
    getAllSales: () => Promise<ResponseDTO>;
}

export const SaleService: ISaleService = {
    createSale: async (saleData: CreateSaleRequest): Promise<ResponseDTO> => {
        try {
            // Calcular el total de la venta considerando descuentos
            let total = 0;
            const productsWithDiscounts = await Promise.all(
                saleData.products.map(async (product) => {
                    // Aquí puedes agregar lógica para obtener el descuento activo del producto
                    // Ejemplo: const discount = await DiscountService.getActiveDiscountForProduct(product.productId);
                    const discount = 0; // Reemplazar con la lógica real
                    const subtotal = product.quantity * product.unitPrice;
                    const discountAmount = (subtotal * discount) / 100;
                    total += subtotal - discountAmount;

                    return {
                        ...product,
                        discount,
                        subtotal,
                        total: subtotal - discountAmount,
                    };
                })
            );

            // Crear la venta
            const sale = await SaleRepository.createSale({
                customer_name: saleData.customerName,
                customer_last_name: saleData.customerLastName,
                customer_tax_id: saleData.customerTaxId,
                payment_method: saleData.paymentMethod,
                total, // Total calculado
                created_by_user_id: saleData.createdByUserId,
                updated_by_user_id: saleData.updatedByUserId,
            });

            // Agregar detalles de la venta
            if (saleData.products) {
                await SaleRepository.addSaleDetails(sale.id, productsWithDiscounts);
            }

            const data: SaleDto = {
                id: sale.id,
                customerName: sale.customer_name,
                customerLastName: sale.customer_last_name,
                customerTaxId: sale.customer_tax_id,
                total: sale.total,
                paymentMethod: sale.payment_method,
                createdByUserId: sale.created_by_user_id,
                updatedByUserId: sale.updated_by_user_id,
                createdAt: sale.created_at?.toISOString(),
                updatedAt: sale.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Sale created successfully', 201, data);
        } catch (error) {
            return new ResponseDTO(false, 'Failed to create sale', 500);
        }
    },

    getSaleById: async (id: string): Promise<ResponseDTO> => {
        try {
            const sale = await SaleRepository.getSaleById(id);
            if (!sale) {
                return new ResponseDTO(false, 'Sale not found', 404);
            }
            const data: SaleDto = {
                id: sale.id,
                customerName: sale.customer_name,
                customerLastName: sale.customer_last_name,
                customerTaxId: sale.customer_tax_id,
                total: sale.total,
                paymentMethod: sale.payment_method,
                createdByUserId: sale.created_by_user_id,
                updatedByUserId: sale.updated_by_user_id,
                createdAt: sale.created_at?.toISOString(),
                updatedAt: sale.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Sale retrieved successfully', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Failed to retrieve sale', 500);
        }
    },

    updateSale: async (id: string, saleData: UpdateSaleRequest): Promise<ResponseDTO> => {
        try {
            const sale = await SaleRepository.updateSale(id, {
                customer_name: saleData.customerName,
                customer_last_name: saleData.customerLastName,
                customer_tax_id: saleData.customerTaxId,
                payment_method: saleData.paymentMethod,
                updated_by_user_id: saleData.updatedByUserId,
            });
            if (!sale) {
                return new ResponseDTO(false, 'Sale not found', 404);
            }
            const data: SaleDto = {
                id: sale.id,
                customerName: sale.customer_name,
                customerLastName: sale.customer_last_name,
                customerTaxId: sale.customer_tax_id,
                total: sale.total,
                paymentMethod: sale.payment_method,
                createdByUserId: sale.created_by_user_id,
                updatedByUserId: sale.updated_by_user_id,
                createdAt: sale.created_at?.toISOString(),
                updatedAt: sale.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Sale updated successfully', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Failed to update sale', 500);
        }
    },

    deleteSale: async (id: string): Promise<ResponseDTO> => {
        try {
            await SaleRepository.deleteSale(id);
            return new ResponseDTO(true, 'Sale deleted successfully', 200);
        } catch (error) {
            return new ResponseDTO(false, 'Failed to delete sale', 500);
        }
    },

    getAllSales: async (): Promise<ResponseDTO> => {
        try {
            const sales = await SaleRepository.getAllSales();
            const data: SaleDto[] = sales.map(sale => ({
                id: sale.id,
                customerName: sale.customer_name,
                customerLastName: sale.customer_last_name,
                customerTaxId: sale.customer_tax_id,
                total: sale.total,
                paymentMethod: sale.payment_method,
                createdByUserId: sale.created_by_user_id,
                updatedByUserId: sale.updated_by_user_id,
                createdAt: sale.created_at?.toISOString(),
                updatedAt: sale.updated_at?.toISOString(),
                details: sale.details?.map(detail => ({
                    id: detail.id,
                    saleId: detail.sale.id,
                    productId: detail.product.id,
                    quantity: detail.quantity,
                    unitPrice: detail.unit_price,
                    subtotal: detail.subtotal,
                    discount: detail.discount,
                })),
            }));
            return new ResponseDTO(true, 'Sales retrieved successfully', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Failed to retrieve sales', 500);
        }
    },
};