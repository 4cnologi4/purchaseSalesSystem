import { SaleRepository } from '../repository/sale.repository';
import { SaleDto } from '../dtos/Sale.dto';
import { CreateSaleRequest } from '../requests/create-sale-request';
import { UpdateSaleRequest } from '../requests/update-sale.request';
import { ResponseDTO } from '../dtos/Response.dto';
import { AppDataSource } from '../database/data-source';
import { Sale } from '../database/entities/Sale';
import { SaleDetail } from '../database/entities/SaleDetail';

interface ISaleService {
    createSale: (saleData: CreateSaleRequest) => Promise<ResponseDTO>;
    getSaleById: (id: string) => Promise<ResponseDTO>;
    updateSale: (id: string, saleData: UpdateSaleRequest) => Promise<ResponseDTO>;
    deleteSale: (id: string) => Promise<ResponseDTO>;
    getAllSales: () => Promise<ResponseDTO>;
}

export const SaleService: ISaleService = {
    createSale: async (saleData: CreateSaleRequest): Promise<ResponseDTO> => {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            // 1. Validación de productos
            if (!saleData.products || saleData.products.length === 0) {
                throw new Error("Debe incluir al menos un producto");
            }

            // 2. Cálculo del total con validaciones
            let total = 0;
            const productsWithDiscounts = await Promise.all(
                saleData.products.map(async (product) => {
                    if (!product.productId || !product.quantity || product.quantity <= 0) {
                        throw new Error("Producto inválido: falta ID o cantidad");
                    }

                    const discount = await SaleRepository.getDiscountByProductId(product.productId);
                    const unitPrice = product.unitPrice || 0;
                    const subtotal = product.quantity * unitPrice;
                    const discountValue = discount?.value || 0;
                    const discountAmount = (subtotal * discountValue) / 100;
                    total += subtotal - discountAmount;

                    return {
                        quantity: product.quantity,
                        unit_price: unitPrice,
                        subtotal,
                        discount: discountValue,
                        total: subtotal - discountAmount,
                        product: { id: product.productId } // Relación con Product
                    };
                })
            );

            // 3. Creación de la venta
            const sale = await queryRunner.manager.save(Sale, {
                customer_name: saleData.customerName,
                customer_last_name: saleData.customerLastName,
                customer_tax_id: saleData.customerTaxId,
                payment_method: saleData.paymentMethod,
                total,
                created_by_user_id: saleData.createdByUserId,
                updated_by_user_id: saleData.updatedByUserId,
                created_at: new Date(),
                updated_at: new Date()
            });

            // 4. Guardar detalles con relación
            await queryRunner.manager.save(
                SaleDetail,
                productsWithDiscounts.map(detail => ({
                    ...detail,
                    sale: { id: sale.id } // Relación con Sale
                }))
            );

            await queryRunner.commitTransaction();

            return new ResponseDTO(true, 'Venta creada exitosamente', 201, {
                id: sale.id,
                total: sale.total
            });

        } catch (error) {
            console.log({ error }); // Log detallado
            await queryRunner.rollbackTransaction();
            console.error("Error en createSale:", error); // Log detallado
            return new ResponseDTO(
                false,
                error instanceof Error ? error.message : "Error al crear venta",
                500
            );
        } finally {
            await queryRunner.release();
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
                details: sale.details?.map(detail => ({
                    id: detail.id,
                    productId: detail.product?.id,
                    product: detail.product,
                    quantity: detail.quantity,
                    unitPrice: detail.unit_price,
                    subtotal: detail.subtotal,
                    discount: detail.discount,
                    total: detail.total
                }))
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
            const data = sales.map(sale => ({
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
                    productId: detail.product?.id,
                    quantity: detail.quantity,
                    unitPrice: detail.unit_price,
                    subtotal: detail.subtotal,
                    discount: detail.discount,
                    total: detail.total
                }))
            }));
            return new ResponseDTO(true, 'Ventas obtenidas', 200, data);
        } catch (error) {
            console.error("Error en getAllSales:", error);
            return new ResponseDTO(false, 'Error al obtener ventas', 500);
        }
    },
};