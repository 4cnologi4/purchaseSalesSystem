import { DiscountRepository } from '../repository/discount.repository';
import { Discount } from '../database/entities/Discount';
import { DiscountDto } from '../dtos/Discount.dto';
import { ResponseDTO } from '../dtos/Response.dto';
import { CreateDiscountRequest } from '../requests/create-discount.request';
import { UpdateDiscountRequest } from '../requests/update-discount.request';
import { v4 as uuidv4 } from "uuid";

interface IDiscountService {
    getAllDiscounts: (search?: string) => Promise<ResponseDTO>;
    getDiscountById: (id: string) => Promise<ResponseDTO>;
    createDiscount: (discountData: CreateDiscountRequest) => Promise<ResponseDTO>;
    updateDiscount: (id: string, discountData: UpdateDiscountRequest) => Promise<ResponseDTO>;
    deleteDiscount: (id: string) => Promise<ResponseDTO>;
}

export const DiscountService: IDiscountService = {
    getAllDiscounts: async (search?: string): Promise<ResponseDTO> => {
        try {
            const discounts = await DiscountRepository.getAllDiscounts(search);
            const data: DiscountDto[] = discounts.map(discount => ({
                id: discount.id,
                productId: discount.product_id,
                product: discount.product ? {
                    id: discount.product.id,
                    name: discount.product.name,
                } : undefined,
                type: discount.type,
                value: discount.value,
                startDate: discount.start_date.toString(),
                endDate: discount.end_date.toString(),
                isActive: discount.is_active,
                createdByUserId: discount.created_by_user_id,
                updatedByUserId: discount.updated_by_user_id,
                createdAt: discount.created_at?.toISOString(),
                updatedAt: discount.updated_at?.toISOString(),
            }));
            return new ResponseDTO(true, 'Descuentos obtenidos exitosamente', 200, data);
        } catch (error) {
            console.error(error);
            return new ResponseDTO(false, 'Error al obtener los descuentos', 500);
        }
    },

    getDiscountById: async (id: string): Promise<ResponseDTO> => {
        try {
            const discount = await DiscountRepository.getDiscountById(id);
            if (!discount) {
                return new ResponseDTO(false, 'Descuento no encontrado', 404);
            }
            const data: DiscountDto = {
                id: discount.id,
                productId: discount.product_id,
                product: discount.product ? {
                    id: discount.product.id,
                    name: discount.product.name,
                } : undefined,
                type: discount.type,
                value: discount.value,
                startDate: discount.start_date.toString(),
                endDate: discount.end_date.toString(),
                isActive: discount.is_active,
                createdByUserId: discount.created_by_user_id,
                updatedByUserId: discount.updated_by_user_id,
                createdAt: discount.created_at?.toISOString(),
                updatedAt: discount.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Descuento obtenido exitosamente', 200, data);
        } catch (error) {
            console.error(error);
            return new ResponseDTO(false, 'Error al obtener el descuento', 500);
        }
    },

    createDiscount: async (discountData: CreateDiscountRequest): Promise<ResponseDTO> => {
        try {
            // Validar si el producto ya tiene un descuento activo
            const hasDiscount = await DiscountRepository.hasActiveDiscount(discountData.productId);
            if (hasDiscount) {
                return new ResponseDTO(false, 'El producto ya tiene un descuento activo', 400);
            }

            const discountEntity: Partial<Discount> = {
                id: uuidv4(),
                product_id: discountData.productId,
                type: discountData.type,
                value: discountData.value,
                start_date: discountData.startDate,
                end_date: discountData.endDate,
                is_active: discountData.isActive ?? true,
                created_by_user_id: discountData.createdByUserId,
                updated_by_user_id: discountData.updatedByUserId,
            };

            const discount = await DiscountRepository.createDiscount(discountEntity);
            const data: DiscountDto = {
                id: discount.id,
                productId: discount.product_id,
                product: discount.product ? {
                    id: discount.product.id,
                    name: discount.product.name,
                } : undefined,
                type: discount.type,
                value: discount.value,
                startDate: discount.start_date.toString(),
                endDate: discount.end_date.toString(),
                isActive: discount.is_active,
                createdByUserId: discount.created_by_user_id,
                updatedByUserId: discount.updated_by_user_id,
                createdAt: discount.created_at?.toISOString(),
                updatedAt: discount.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Descuento creado exitosamente', 201, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al crear el descuento', 500);
        }
    },

    updateDiscount: async (id: string, discountData: UpdateDiscountRequest): Promise<ResponseDTO> => {
        try {
            // Obtener el descuento actual para verificar el productId
            const currentDiscount = await DiscountRepository.getDiscountById(id);
            if (!currentDiscount) {
                return new ResponseDTO(false, 'Descuento no encontrado', 404);
            }

            // Si se está actualizando el productId, validar si el nuevo producto ya tiene un descuento activo
            if (discountData.productId && discountData.productId !== currentDiscount.product_id) {
                const hasDiscount = await DiscountRepository.hasActiveDiscount(discountData.productId);
                if (hasDiscount) {
                    return new ResponseDTO(false, 'El producto ya tiene un descuento activo', 400);
                }
            }

            const discountEntity: Partial<Discount> = {
                product_id: discountData.productId,
                type: discountData.type,
                value: discountData.value,
                start_date: discountData.startDate,
                end_date: discountData.endDate,
                is_active: discountData.isActive,
                updated_by_user_id: discountData.updatedByUserId,
            };

            const discount = await DiscountRepository.updateDiscount(id, discountEntity);
            if (!discount) {
                return new ResponseDTO(false, 'Descuento no encontrado', 404);
            }
            const data: DiscountDto = {
                id: discount.id,
                productId: discount.product_id,
                product: discount.product ? {
                    id: discount.product.id,
                    name: discount.product.name,
                } : undefined,
                type: discount.type,
                value: discount.value,
                startDate: discount.start_date.toString(),
                endDate: discount.end_date.toString(),
                isActive: discount.is_active,
                createdByUserId: discount.created_by_user_id,
                updatedByUserId: discount.updated_by_user_id,
                createdAt: discount.created_at?.toISOString(),
                updatedAt: discount.updated_at?.toISOString(),
            };
            return new ResponseDTO(true, 'Descuento actualizado exitosamente', 200, data);
        } catch (error) {
            return new ResponseDTO(false, 'Error al actualizar el descuento', 500);
        }
    },

    deleteDiscount: async (id: string): Promise<ResponseDTO> => {
        try {
            const discount = await DiscountRepository.getDiscountById(id);
            if (!discount) {
                return new ResponseDTO(false, 'Descuento no encontrado', 404);
            }
            await DiscountRepository.deleteDiscount(id);
            return new ResponseDTO(true, 'Descuento desactivado exitosamente', 200);
        } catch (error) {
            return new ResponseDTO(false, 'Error al desactivar el descuento', 500);
        }
    },
}; 