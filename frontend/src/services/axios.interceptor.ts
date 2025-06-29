import axios from "axios";
import { useAppStore } from "@/stores/appStore";

// Configuración base de axios
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
    (config) => {
        const { token } = useAppStore.getState().auth;

        // Excluir rutas de autenticación
        const isAuthRequest = config.url?.includes("/auth/");

        if (token && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);