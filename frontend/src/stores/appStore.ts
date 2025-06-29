import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definición del estado de autenticación
interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Definición del estado global de la aplicación
interface AppState {
  auth: AuthState;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      auth: {
        isAuthenticated: false,
        email: null,
        login: async (email: string, password: string) => {
          set((state) => ({
            auth: {
              ...state.auth,
              isAuthenticated: true,
              email,
            },
          }));
        },
        logout: () => {
          set((state) => ({
            auth: {
              ...state.auth,
              isAuthenticated: false,
              email: null,
            },
          }));
        },
      },
    }),
    {
      name: "app-storage", // Nombre de la clave en localStorage
      partialize: (state) => ({ auth: state.auth }), // Solo persiste el estado de autenticación
    }
  )
); 