import { Navigate, Route, Routes } from "react-router-dom";
import { LoginController } from "./pages/auth/login.controller";
import { DashboardController } from "./pages/dashboard/dashboard.controller";
import { useAppStore } from "./stores/appStore";
import { Layout } from "./pages/layout/layout";
import { ProductsController } from "./pages/products/products.controller";
import { DiscountsController } from "./pages/discounts/discounts.controller";
import { SalesController } from "./pages/sales/sales.controller";

const AppRoutes = () => {
  const { auth } = useAppStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginController />} />

      {auth.isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardController />} />
          <Route path="/products" element={<ProductsController />} />
          <Route path="/discounts" element={<DiscountsController />} />
          <Route path="/sales" element={<SalesController />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;