import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { LoginController } from "./ui/pages/auth/login.controller";
import { useAuthStore } from "./stores/auth-store";
import { Dashboard } from "./ui/pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginController />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
} 