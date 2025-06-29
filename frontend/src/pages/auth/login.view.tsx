import { Login } from "@/components/ui/login";
import type { LoginRequest } from "@/requests/login.request";

interface LoginViewProps {
  onSubmit: (request: LoginRequest) => void;
}

export function LoginView({ onSubmit }: LoginViewProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-blue-500 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
        <Login onSubmit={onSubmit} />
      </div>
    </div>
  );
} 