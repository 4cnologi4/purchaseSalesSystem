import { LoginView } from "./login.view";
import { useAppStore } from "@/stores/appStore";
import { httpManager } from "@/services/HttpManager";
import type { LoginRequest } from "@/requests/login.request";
import { useNavigate } from "react-router-dom";

export function LoginController() {
  const { auth } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = async (request: LoginRequest) => {
    try {
      const response = await httpManager.authService.login(request);
      if (response.success) {
        await auth.login(request.email, request.password, response.data.token);
        navigate("/dashboard"); // Redirige al dashboard
      } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error al iniciar sesión. Por favor, inténtalo más tarde.");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return <LoginView onSubmit={handleLogin} />;
} 