import { LoginView } from "./login.view";
import { useAuthStore } from "@/stores/auth-store";

export function LoginController() {
  const { login } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return <LoginView />;
} 