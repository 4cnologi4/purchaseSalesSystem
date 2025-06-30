import type { ProductDto } from "@/dtos/Product.dto";
import axiosInstance from "./axios.interceptor";

interface GetProductsOptions {
    search?: string;
    code?: string;
    name?: string;
}

export const ProductsService = {
    getAll: async (options?: GetProductsOptions): Promise<ProductDto[]> => {
        try {
            const params = new URLSearchParams();
            if (options?.search) params.append('search', options.search);
            if (options?.code) params.append('code', options.code);
            if (options?.name) params.append('name', options.name);

            const response = await axiosInstance.get("/products", { params });
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener productos");
        }
    },
    getById: async (id: string): Promise<ProductDto> => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al obtener el producto");
        }
    },
    create: async (product: Omit<ProductDto, 'id'>): Promise<ProductDto> => {
        try {
            const response = await axiosInstance.post("/products", product);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al crear producto");
        }
    },
    update: async (id: string, product: Partial<ProductDto>): Promise<ProductDto> => {
        try {
            const response = await axiosInstance.put(`/products/${id}`, product);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al actualizar producto");
        }
    },
    delete: async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/products/${id}`);
        } catch (error) {
            throw new Error("Error al eliminar producto");
        }
    },
    search: async (query: string): Promise<ProductDto[]> => {
        try {
            const response = await axiosInstance.get(`/products?q=${query}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Error al buscar productos");
        }
    }
}; 