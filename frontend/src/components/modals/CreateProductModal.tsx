import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CommonModal } from "./CommonModal";
import { httpManager } from "@/services/HttpManager";
import { toast } from "sonner";
import type { ProductDto } from "@/dtos/Product.dto";
import { UNITS_OF_MEASURE } from "@/util/Constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateProductModal({ isOpen, onClose, onSuccess }: CreateProductModalProps) {
  const [formData, setFormData] = useState<Omit<ProductDto, "id">>({
    code: "",
    name: "",
    description: "",
    unitPrice: 0,
    unitOfMeasureId: 1, // Valor por defecto: "unidad"
    isActive: true,
  });

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      unitPrice: 0,
      unitOfMeasureId: 1,
      isActive: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleUnitChange = (value: string) => {
    setFormData({
      ...formData,
      unitOfMeasureId: parseInt(value),
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await httpManager.productsService.create(formData);
      toast.success("Producto creado correctamente");
      resetForm(); // Limpiar el formulario
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("Error al crear el producto");
    }
  };

  return (
    <CommonModal isOpen={isOpen} title="Agregar Producto" onClose={handleCancel}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code">Código</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="unitPrice">Precio Unitario</Label>
          <Input
            id="unitPrice"
            name="unitPrice"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="unitOfMeasureId">Unidad de Medida</Label>
          <Select
            value={formData.unitOfMeasureId?.toString()}
            onValueChange={handleUnitChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una unidad" />
            </SelectTrigger>
            <SelectContent>
              {UNITS_OF_MEASURE.map((unit) => (
                <SelectItem key={unit.value} value={unit.value.toString()}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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