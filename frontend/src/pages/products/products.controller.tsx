import { useState, useEffect } from "react";
import { ProductsView } from "./products.view";
import { httpManager } from "@/services/HttpManager";
import type { ProductDto } from "@/dtos/Product.dto";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { Toaster } from "sonner";

export function ProductsController() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await httpManager.productsService.getAll();
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredProducts(products);
            return;
        }
        const filtered = products.filter(product => 
            product.name?.toLowerCase().includes(query.toLowerCase()) ||
            product.code?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleDeleteClick = (product: ProductDto) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProduct) return;

        try {
            await httpManager.productsService.delete(selectedProduct.id!);
            toast.success("Producto eliminado correctamente.");
            await fetchProducts(); // Refrescar la lista
        } catch (error) {
            toast.error("No se pudo eliminar el producto.");
        } finally {
            setIsModalOpen(false);
            setSelectedProduct(null);
        }
    };

    return (
        <>
            <ProductsView 
                products={filteredProducts} 
                loading={loading}
                onSearch={handleSearch}
                onDeleteClick={handleDeleteClick}
            />
            <ConfirmModal
                isOpen={isModalOpen}
                title="Confirmar eliminación"
                message={`¿Estás seguro de eliminar el producto "${selectedProduct?.name}"?`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsModalOpen(false)}
            />
            <Toaster position="top-right" />
        </>
    );
} 