import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/common-table";
import type { ProductDto } from "@/dtos/Product.dto";
import { Button } from "@/components/ui/button";
import { MdDeleteForever, MdAdd, MdEdit, MdSearch } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateProductModal } from "@/components/modals/CreateProductModal";

interface ProductsViewProps {
    products: ProductDto[];
    loading: boolean;
    onSearch: (query: string) => void;
    onDeleteClick: (product: ProductDto) => void;
    onProductCreated: () => void;
    onEditClick: (product: ProductDto) => void;
}

export function ProductsView({ products, loading, onSearch, onDeleteClick, onProductCreated, onEditClick }: ProductsViewProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const columns = [
        {
            key: "code",
            header: "Código"
        },
        {
            key: "name",
            header: "Nombre"
        },
        {
            key: "description",
            header: "Descripción"
        },
        {
            key: "unitPrice",
            header: "Precio"
        },
        {
            key: "isActive",
            header: "Estado",
            render: (value: boolean) => (value ? "Activo" : "Inactivo")
        },
        {
            key: "actions",
            header: "Acciones",
            render: (product: ProductDto) => (
                <div className="flex space-x-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="default"
                                size="icon"
                                onClick={() => onEditClick(product)}
                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <MdEdit className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Editar</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => onDeleteClick(product)}
                                className="cursor-pointer"
                            >
                                <MdDeleteForever className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Eliminar</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold">Productos</h1>
                <Button 
                    className="cursor-pointer w-full sm:w-auto"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <MdAdd className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Agregar Producto</span>
                    <span className="sm:hidden">Agregar</span>
                </Button>
            </div>

            <div className="mb-4 flex gap-2">
                <div className="relative flex-1 max-w-md">
                    <Input
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pr-12"
                    />
                    <Button
                        variant="default"
                        size="sm"
                        className="cursor-pointer absolute right-0 top-0 h-full px-3 bg-blue-600 hover:bg-blue-700"
                        onClick={handleSearch}
                    >
                        <MdSearch className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <Table columns={columns} data={products} />
            )}

            <CreateProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={onProductCreated}
            />
        </div>
    );
} 