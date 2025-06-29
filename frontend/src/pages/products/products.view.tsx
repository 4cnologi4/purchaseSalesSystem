import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/common-table";
import type { ProductDto } from "@/dtos/Product.dto";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductsViewProps {
    products: ProductDto[];
    loading: boolean;
    onSearch: (query: string) => void;
    onDeleteClick: (product: ProductDto) => void;
}

export function ProductsView({ products, loading, onSearch, onDeleteClick }: ProductsViewProps) {
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
            header: "Precio",
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
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="cursor-pointer"
                            variant="destructive"
                            size="icon"
                            onClick={() => onDeleteClick(product)}
                        >
                            <MdDeleteForever className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Eliminar</p>
                    </TooltipContent>
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Productos</h1>

            <div className="mb-4">
                <Input
                    placeholder="Buscar productos..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="mb-4"
                />
            </div>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <Table columns={columns} data={products} />
            )}
        </div>
    );
} 