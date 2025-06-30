import { useState, useEffect } from "react";
import { ProductsView } from "./products.view";
import { httpManager } from "@/services/HttpManager";
import type { ProductDto } from "@/dtos/Product.dto";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { EditProductModal } from "@/components/modals/EditProductModal";

export function ProductsController() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);

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

    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            const data = await httpManager.productsService.getAll({ search: query });
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
            toast.error("Error al buscar productos");
        } finally {
            setLoading(false);
        }
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

    const handleProductCreated = () => {
        fetchProducts(); // Refrescar la lista después de crear
    };

    const handleEditClick = (product: ProductDto) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        fetchProducts();
        setIsEditModalOpen(false);
    };

    return (
        <>
            <ProductsView 
                products={filteredProducts} 
                loading={loading}
                onSearch={handleSearch}
                onDeleteClick={handleDeleteClick}
                onProductCreated={handleProductCreated}
                onEditClick={handleEditClick}
            />
            <ConfirmModal
                isOpen={isModalOpen}
                title="Confirmar eliminación"
                message={`¿Estás seguro de eliminar el producto "${selectedProduct?.name}"?`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsModalOpen(false)}
            />
            {editingProduct && (
                <EditProductModal
                    isOpen={isEditModalOpen}
                    product={editingProduct}
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={handleEditSuccess}
                />
            )}
            <Toaster position="top-right" />
        </>
    );
} 