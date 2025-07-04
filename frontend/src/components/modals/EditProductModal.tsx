import { useState, useEffect } from "react";
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
import { ConfirmModal } from "../ui/ConfirmModal";

interface EditProductModalProps {
  isOpen: boolean;
  product: ProductDto;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditProductModal({ isOpen, product, onClose, onSuccess }: EditProductModalProps) {
  const getValidUnitId = (value: any): number => {
    const num = parseInt(value);
    return (!isNaN(num) && num >= 1 && num <= 4) ? num : 1;
  };

  const [formData, setFormData] = useState<ProductDto>({
    ...product,
    unitPrice: Number(product.unitPrice) || 0,
    unitOfMeasureId: getValidUnitId(product.unitOfMeasureId)
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setFormData({
      ...product,
      unitPrice: Number(product.unitPrice) || 0,
      unitOfMeasureId: getValidUnitId(product.unitOfMeasureId)
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleUnitChange = (value: string) => {
    const newUnitId = parseInt(value);
    if (!isNaN(newUnitId)) {
      setFormData({
        ...formData,
        unitOfMeasureId: newUnitId
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      await httpManager.productsService.update(formData.id!, formData);
      toast.success("Producto actualizado correctamente");
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("Error al actualizar el producto");
    } finally {
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    console.log('Current validated unitOfMeasureId:', formData.unitOfMeasureId);
    console.log('Matching unit:', UNITS_OF_MEASURE.find(u => u.value === formData.unitOfMeasureId));
  }, [formData.unitOfMeasureId]);

  console.log('Product received:', {
    ...product,
    unitOfMeasureType: typeof product.unitOfMeasureId,
    unitOfMeasureRawValue: product.unitOfMeasureId
  });

  return (
    <>
      <CommonModal isOpen={isOpen} title="Editar Producto" onClose={onClose}>
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
                <SelectValue>
                  {UNITS_OF_MEASURE.find(u => u.value === formData.unitOfMeasureId)?.label}
                </SelectValue>
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
            <Button className="cursor-pointer" type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="cursor-pointer" type="submit">Guardar</Button>
          </div>
        </form>
      </CommonModal>

      <ConfirmModal
        isOpen={showConfirm}
        title="Confirmar actualización"
        message="¿Estás seguro de actualizar este producto?"
        onConfirm={handleConfirmUpdate}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
} 