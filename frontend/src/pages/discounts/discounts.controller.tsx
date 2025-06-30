import { DiscountsView } from "./discounts.view";
import { useState, useEffect } from "react";
import type { DiscountDto } from "@/dtos/Discount.dto";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { httpManager } from "@/services/HttpManager";
import { EditDiscountModal } from "@/components/modals/EditDiscountModal";
import { DiscountsService } from "@/services/discounts.service";

export function DiscountsController() {
	const [discounts, setDiscounts] = useState<DiscountDto[]>([]);
	const [filteredDiscounts, setFilteredDiscounts] = useState<DiscountDto[]>([]);
	const [loading, setLoading] = useState(true);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedDiscount, setSelectedDiscount] = useState<DiscountDto | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingDiscount, setEditingDiscount] = useState<DiscountDto | null>(null);

	useEffect(() => {
		fetchDiscounts();
	}, []);

	const fetchDiscounts = async () => {
		try {
			setLoading(true);
			const data = await DiscountsService.getAll();
			setDiscounts(data);
			setFilteredDiscounts(data);
		} catch (error) {
			toast.error("Error al cargar descuentos");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = async (query: string) => {
		try {
			setLoading(true);
			const data = await httpManager.discountService.search(query);
			setFilteredDiscounts(data);
		} catch (error) {
			toast.error("Error al buscar descuentos");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteClick = (discount: DiscountDto) => {
		setSelectedDiscount(discount);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!selectedDiscount) return;
		try {
			await httpManager.discountService.delete(selectedDiscount.id);
			toast.success("Descuento eliminado correctamente");
			await fetchDiscounts();
		} catch (error) {
			toast.error("Error al eliminar el descuento");
		} finally {
			setIsDeleteModalOpen(false);
		}
	};

	const handleDiscountCreated = () => {
		fetchDiscounts();
	};

	const handleEditClick = (discount: DiscountDto) => {
		setEditingDiscount(discount);
		setIsEditModalOpen(true);
	};

	const handleEditSuccess = () => {
		fetchDiscounts();
		setIsEditModalOpen(false);
	};

	return (
		<>
			<DiscountsView
				discounts={discounts}
				loading={loading}
				onSearch={handleSearch}
				onDeleteClick={handleDeleteClick}
				onDiscountCreated={handleDiscountCreated}
				onEditClick={handleEditClick}
			/>
			<ConfirmModal
				isOpen={isDeleteModalOpen}
				title="Confirmar eliminación"
				message={`¿Estás seguro de eliminar el descuento para el producto ${selectedDiscount?.productId}?`}
				onConfirm={handleConfirmDelete}
				onCancel={() => setIsDeleteModalOpen(false)}
			/>
			{editingDiscount && (
				<EditDiscountModal
					isOpen={isEditModalOpen}
					discount={editingDiscount}
					onClose={() => setIsEditModalOpen(false)}
					onSuccess={handleEditSuccess}
				/>
			)}
			<Toaster position="top-right" />
		</>
	);
} 