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

interface EditDiscountModalProps {
  isOpen: boolean;
  discount: DiscountDto;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditDiscountModal({ isOpen, discount, onClose, onSuccess }: EditDiscountModalProps) {
  const [formData, setFormData] = useState<UpdateDiscountRequest>({
    productId: discount.productId,
    type: discount.type,
    value: +discount.value,
    isActive: discount.isActive,
    startDate: discount.startDate,
    endDate: discount.endDate
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setFormData({
      productId: discount.productId,
      type: discount.type,
      value: +discount.value,
      isActive: discount.isActive,
      startDate: discount.startDate,
      endDate: discount.endDate
    });
  }, [discount]);

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
          {/* Campo: ID del Producto */}
          <div>
            <Label htmlFor="productId">ID del Producto</Label>
            <Input
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo: Tipo */}
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Input
              id="type"
              name="type"
              type="number"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo: Valor */}
          <div>
            <Label htmlFor="value">Valor (%)</Label>
            <Input
              id="value"
              name="value"
              type="number"
              step="0.01"
              value={formData.value}
              onChange={handleChange}
              required
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