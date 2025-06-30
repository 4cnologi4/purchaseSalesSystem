import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CommonModal } from "./CommonModal";
import { DiscountsService } from "@/services/discounts.service";
import { toast } from "sonner";
import { ConfirmModal } from "../ui/ConfirmModal";
import type { DiscountDto } from "@/dtos/Discount.dto";
import type { UpdateDiscountRequest } from "@/requests/update-discount.request";
import { httpManager } from "@/services/HttpManager";

interface EditDiscountModalProps {
    isOpen: boolean;
    discount: DiscountDto;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditDiscountModal({ isOpen, discount, onClose, onSuccess }: EditDiscountModalProps) {
    const [formData, setFormData] = useState<UpdateDiscountRequest>({
        productId: discount.productId,
        productName: discount.product?.name || "",
        type: discount.type || 0,
        value: +discount.value,
        isActive: discount.isActive,
        startDate: discount.startDate,
        endDate: discount.endDate,
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [productUnitPrice, setProductUnitPrice] = useState<number | undefined>(undefined);

    // Obtener el precio unitario del producto al cargar el modal
    useEffect(() => {
        const fetchProductUnitPrice = async () => {
            if (discount.productId) {
                try {
                    const product = await httpManager.productsService.getById(discount.productId);
                    setProductUnitPrice(product.unitPrice);
                } catch (error) {
                    console.error("Error al obtener el precio del producto:", error);
                }
            }
        };
        fetchProductUnitPrice();
    }, [discount.productId]);

    // Calcular el valor del descuento cuando cambia el tipo
    useEffect(() => {
        if (productUnitPrice !== undefined && (formData.type ?? 0) > 0) {
            const calculatedValue = (productUnitPrice * (formData.type ?? 0)) / 100;
            setFormData(prev => ({
                ...prev,
                value: parseFloat(calculatedValue.toFixed(2)),
            }));
        }
    }, [formData.type, productUnitPrice]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : (type === "number" ? parseFloat(value) : value),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirmUpdate = async () => {
        try {
            await DiscountsService.update(discount.id, formData);
            toast.success("Descuento actualizado correctamente");
            onClose();
            onSuccess();
        } catch (error) {
            toast.error("Error al actualizar el descuento");
        } finally {
            setShowConfirm(false);
        }
    };

    return (
        <>
            <CommonModal isOpen={isOpen} title="Editar Descuento" onClose={onClose}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo: ID del Producto (deshabilitado) */}
                    <div>
                        <Label htmlFor="productId">ID del Producto</Label>
                        <Input
                            id="productId"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            disabled
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Campo: Nombre del Producto (deshabilitado) */}
                    <div>
                        <Label htmlFor="productName">Producto</Label>
                        <Input
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            disabled
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Campo: Tipo */}
                    <div>
                        <Label htmlFor="type">Tipo (%)</Label>
                        <Input
                            id="type"
                            name="type"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Campo: Valor (calculado automáticamente) */}
                    <div>
                        <Label htmlFor="value">Valor ($)</Label>
                        <Input
                            id="value"
                            name="value"
                            type="number"
                            step="0.01"
                            value={formData.value}
                            onChange={handleChange}
                            required
                            readOnly
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Campo: Activo */}
                    <div className="flex items-center gap-2">
                        <Input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <Label htmlFor="isActive">¿Activo?</Label>
                    </div>

                    {/* Campo: Fecha de Inicio */}
                    <div>
                        <Label htmlFor="startDate">Fecha de Inicio</Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Campo: Fecha de Fin */}
                    <div>
                        <Label htmlFor="endDate">Fecha de Fin</Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                            Guardar
                        </Button>
                    </div>
                </form>
            </CommonModal>

            <ConfirmModal
                isOpen={showConfirm}
                title="Confirmar actualización"
                message="¿Estás seguro de actualizar este descuento?"
                onConfirm={handleConfirmUpdate}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
} 