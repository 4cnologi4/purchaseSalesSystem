import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommonModal } from "./CommonModal";
import { DiscountsService } from "@/services/discounts.service";
import { toast } from "sonner";
import type { CreateDiscountRequest } from "@/requests/create-discount.request";

interface CreateDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateDiscountModal({ isOpen, onClose, onSuccess }: CreateDiscountModalProps) {
  const [formData, setFormData] = useState<CreateDiscountRequest>({
    productId: "",
    type: 0,
    value: 0,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      productId: "",
      type: 0,
      value: 0,
      isActive: true,
      startDate: "",
      endDate: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DiscountsService.create(formData);
      toast.success("Descuento creado correctamente");
      resetForm();
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("Error al crear el descuento");
      console.error(error);
    }
  };

  return (
    <CommonModal isOpen={isOpen} title="Crear Descuento" onClose={handleCancel}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo: ID del Producto */}
        <div>
          <Label htmlFor="productId">ID del Producto *</Label>
          <Input
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            placeholder="Ej: 95f6db3a-3df7-4178-959c-d7798f66005b"
          />
        </div>

        {/* Campo: Tipo */}
        <div>
          <Label htmlFor="type">Tipo *</Label>
          <Input
            id="type"
            name="type"
            type="number"
            min="0"
            value={formData.type}
            onChange={handleChange}
            required
            placeholder="Ej: 50"
          />
        </div>

        {/* Campo: Valor */}
        <div>
          <Label htmlFor="value">Valor (%) *</Label>
          <Input
            id="value"
            name="value"
            type="number"
            min="0"
            step="0.01"
            value={formData.value}
            onChange={handleChange}
            required
            placeholder="Ej: 10"
          />
        </div>

        {/* Campo: Activo */}
        <div className="flex items-center gap-2">
          <Input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <Label htmlFor="isActive">¿Activo?</Label>
        </div>

        {/* Campo: Fecha de Inicio */}
        <div>
          <Label htmlFor="startDate">Fecha de Inicio *</Label>
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
          <Label htmlFor="endDate">Fecha de Fin *</Label>
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
            onClick={handleCancel}
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
  );
}