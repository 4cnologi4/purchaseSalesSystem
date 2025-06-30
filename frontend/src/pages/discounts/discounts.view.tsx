import { CreateDiscountModal } from "../../components/modals/CreateDiscountModal";
import { useState } from "react";
import type { DiscountDto } from "@/dtos/Discount.dto";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/common-table";
import { Input } from "@/components/ui/input";
import { MdDeleteForever, MdAdd, MdEdit, MdSearch } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DiscountsViewProps {
	discounts: DiscountDto[];
	loading: boolean;
	onSearch: (query: string) => void;
	onDeleteClick: (discount: DiscountDto) => void;
	onDiscountCreated: () => void;
	onEditClick: (discount: DiscountDto) => void;
}

export function DiscountsView({ discounts, loading, onSearch, onDeleteClick, onDiscountCreated, onEditClick }: DiscountsViewProps) {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		if (searchQuery.trim() === "") {
			onSearch("");  // Busqueda vacía para resetear
		} else {
			onSearch(searchQuery);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const columns = [
		{
			key: "productId",
			header: "ID del Producto"
		},
		{
			key: "product",
			header: "Nombre",
			render: (discount: DiscountDto) => (discount.product.name)
		},
		{
			key: "type",
			header: "Tipo"
		},
		{
			key: "value",
			header: "Valor"
		},
		{
			key: "isActive",
			header: "Estado",
			render: (discount: DiscountDto) => (discount.isActive ? "Activo" : "Inactivo")
		},
		{
			key: "actions",
			header: "Acciones",
			render: (discount: DiscountDto) => (
				<div className="flex space-x-2">
					<Tooltip>
						<TooltipTrigger>
							<Button
								variant="default"
								size="icon"
								onClick={() => onEditClick(discount)}
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
						<TooltipTrigger>
							<Button
								variant="destructive"
								size="icon"
								onClick={() => onDeleteClick(discount)}
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
				<h1 className="text-2xl font-bold">Descuentos</h1>
				<Button
					className="cursor-pointer w-full sm:w-auto"
					onClick={() => setIsCreateModalOpen(true)}
				>
					<MdAdd className="mr-2 h-4 w-4" />
					<span className="hidden sm:inline">Agregar Descuento</span>
					<span className="sm:hidden">Agregar</span>
				</Button>
			</div>

			<div className="mb-4 flex gap-2">
				<div className="relative flex-1 max-w-md">
					<Input
						placeholder="Buscar descuentos..."
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
				<p>Cargando descuentos...</p>
			) : (
				<Table columns={columns} data={discounts} />
			)}

			<CreateDiscountModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSuccess={onDiscountCreated}
			/>
		</div>
	);
} 