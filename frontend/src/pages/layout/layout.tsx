import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 p-4">
        <Outlet /> {/* Renderiza las páginas hijas aquí */}
      </div>
    </div>
  );
} 