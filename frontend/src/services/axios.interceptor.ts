import axios from "axios";
import { toast } from "sonner";
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

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && 
            error.response?.data?.message === "Unauthorized: Invalid token") {
            // Mostrar modal de sesión expirada
            window.dispatchEvent(new CustomEvent("session-expired"));
            // Limpiar token del store
            useAppStore.getState().auth.logout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;