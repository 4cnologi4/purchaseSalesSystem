import type { CreateDiscountRequest } from "@/requests/create-discount.request";
import type { DiscountDto } from "../dtos/Discount.dto";
import axiosInstance from "./axios.interceptor";
import type { UpdateDiscountRequest } from "@/requests/update-discount.request";

interface GetDiscountsOptions {
    productId?: string;
    isActive?: boolean;
    type?: number;
}

export const DiscountsService = {
    getAll: async (options?: GetDiscountsOptions): Promise<DiscountDto[]> => {
        try {
            const params = new URLSearchParams();
            if (options?.productId) params.append('productId', options.productId);
            if (options?.isActive !== undefined) params.append('isActive', String(options.isActive));
            if (options?.type) params.append('type', String(options.type));

            const response = await axiosInstance.get("/discounts", { params });
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener descuentos");
        }
    },
    getById: async (id: string): Promise<DiscountDto> => {
        try {
            const response = await axiosInstance.get(`/discounts/${id}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener el descuento");
        }
    },
    create: async (discount: CreateDiscountRequest): Promise<DiscountDto> => {
        try {
            const response = await axiosInstance.post("/discounts", discount);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al crear descuento");
        }
    },
    update: async (id: string, discount: UpdateDiscountRequest): Promise<DiscountDto> => {
        try {
            const response = await axiosInstance.put(`/discounts/${id}`, discount);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al actualizar descuento");
        }
    },
    delete: async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/discounts/${id}`);
        } catch (error) {
            throw new Error("Error al eliminar descuento");
        }
    },
    search: async (query: string): Promise<DiscountDto[]> => {
        try {
            const response = await axiosInstance.get(`/discounts?q=${query}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al buscar descuentos");
        }
    }
}; 