import axios from "axios";
import { useAppStore } from "@/stores/appStore";

// Configuración base de axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAppStore.getState().auth.token;

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
        // Excluir la ruta de login del manejo de token expirado
        if (error.config.url.includes("/auth/login")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && 
            error.response?.data?.message === "Unauthorized: Invalid token") {
            // Mostrar modal de sesión expirada
            window.dispatchEvent(new CustomEvent("session-expired"));
            // Limpiar token del store
            useAppStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;