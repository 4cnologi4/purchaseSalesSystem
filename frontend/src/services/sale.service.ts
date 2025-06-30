import type { SaleDto, SaleDetailDto } from "@/dtos/Sale.dto";
import axiosInstance from "./axios.interceptor";

interface GetSalesOptions {
    search?: string;
    customerName?: string;
    paymentMethod?: string;
}

export const SalesService = {
    getAll: async (options?: GetSalesOptions): Promise<SaleDto[]> => {
        try {
            const params = new URLSearchParams();
            if (options?.search) params.append('search', options.search);
            if (options?.customerName) params.append('customerName', options.customerName);
            if (options?.paymentMethod) params.append('paymentMethod', options.paymentMethod);

            const response = await axiosInstance.get("/sales", { params });
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener ventas");
        }
    },

    getById: async (id: string): Promise<SaleDto> => {
        try {
            const response = await axiosInstance.get(`/sales/${id}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener la venta");
        }
    },

    create: async (sale: Omit<SaleDto, 'id'>): Promise<SaleDto> => {
        try {
            const response = await axiosInstance.post("/sales", sale);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al crear venta");
        }
    },

    update: async (id: string, sale: Partial<SaleDto>): Promise<SaleDto> => {
        try {
            const response = await axiosInstance.put(`/sales/${id}`, sale);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al actualizar venta");
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/sales/${id}`);
        } catch (error) {
            throw new Error("Error al eliminar venta");
        }
    },

    search: async (query: string): Promise<SaleDto[]> => {
        try {
            const response = await axiosInstance.get(`/sales?q=${query}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al buscar ventas");
        }
    }
};
