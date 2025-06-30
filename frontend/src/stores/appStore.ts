import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definición del estado de autenticación
interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string;
}

// Definición del estado global de la aplicación
interface AppState {
  auth: AuthState;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      auth: {
        isAuthenticated: false,
        email: null,
        token: "",
      },
      login: (email, token) => {
        set({
          auth: {
            isAuthenticated: true,
            email,
            token,
          },
        });
      },
      logout: () => {
        set({
          auth: {
            isAuthenticated: false,
            email: null,
            token: "",
          },
        });
      },
    }),
    {
      name: "app-storage", // Nombre de la clave en localStorage
      partialize: (state) => ({ auth: state.auth }), // Solo persiste el estado de autenticación
    }
  )
); 