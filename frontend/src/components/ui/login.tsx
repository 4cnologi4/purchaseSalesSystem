import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginRequest } from "@/requests/login.request";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onSubmit: (request: LoginRequest) => void;
}

export function Login({ onSubmit }: LoginProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const handleFormSubmit = async (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "Email es requerido" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "Contraseña es requerida" })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <div className="flex justify-center">
        <Button className="cursor-pointer" type="submit">Iniciar sesión</Button>
      </div>
    </form>
  );
} 