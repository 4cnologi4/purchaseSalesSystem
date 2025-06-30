import { LoginView } from "./login.view";
import { useAppStore } from "@/stores/appStore";
import { httpManager } from "@/services/HttpManager";
import type { LoginRequest } from "@/requests/login.request";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginController() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);

  const handleLogin = async (request: LoginRequest) => {
    try {
      const response = await httpManager.authService.login(request);
      
      if (response.success) {
        login(request.email, response.data.token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return <LoginView onSubmit={handleLogin} />;
} 