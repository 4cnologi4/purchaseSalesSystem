import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-gray-800 p-4 z-50 shadow-md">
            <div className="container mx-auto flex space-x-4">
                <Link to="/dashboard" className="text-white hover:text-gray-300">
                    Inicio
                </Link>
                <Link to="/products" className="text-white hover:text-gray-300">
                    Productos
                </Link>
                <Link to="/discounts" className="text-white hover:text-gray-300">
                    Descuentos
                </Link>
                <Link to="/sales" className="text-white hover:text-gray-300">
                    Ventas
                </Link>
            </div>
        </nav>
    );
} 