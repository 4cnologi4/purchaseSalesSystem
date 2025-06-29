import type { LoginRequest } from "@/requests/login.request";
import axios from "axios";
import { useAppStore } from "@/stores/appStore";

interface LoginResponse {
    success: boolean;
    message: string;
    status: number;
    data: any;
}

export const AuthService = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`,
                request,
            );
            
            if (response.data.success) {
                const { login } = useAppStore.getState().auth;
                await login(request.email, request.password);
            }
            
            return response.data;
        } catch (error) {
            throw new Error("Error al iniciar sesión");
        }
    },
}; 