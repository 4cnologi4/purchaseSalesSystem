import axios from "axios";
import type { LoginRequest } from "@/requests/login.request";
import { useAppStore } from "@/stores/appStore";

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
    };
}

export const AuthService = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, request);
            
            if (!response.data.success) {
                throw new Error(response.data.message || "Credenciales incorrectas");
            }

            return {
                success: true,
                message: "Login exitoso",
                data: {
                    token: response.data.data.token
                }
            };
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Error al iniciar sesión");
        }
    },
}; 