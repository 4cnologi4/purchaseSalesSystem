import type { LoginRequest } from "@/requests/login.request";
import { useAppStore } from "@/stores/appStore";
import { axiosInstance } from "./axios.interceptor";

interface LoginResponse {
    success: boolean;
    message: string;
    status: number;
    data: {
        token: string;
    };
}

export const AuthService = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await axiosInstance.post("/auth/login", request);
            
            if (response.data.success) {
                const { login } = useAppStore.getState().auth;
                await login(request.email, request.password, response.data.data.token);
            }
            
            return response.data;
        } catch (error) {
            throw new Error("Error al iniciar sesión");
        }
    },
}; 