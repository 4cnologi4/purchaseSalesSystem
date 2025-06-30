import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommonModal } from "./CommonModal";
import { DiscountsService } from "@/services/discounts.service";
import { toast } from "sonner";
import type { CreateDiscountRequest } from "@/requests/create-discount.request";
import { httpManager } from "@/services/HttpManager";
import type { ProductDto } from "@/dtos/Product.dto";

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
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);

  // Buscar productos cuando cambia el query
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim() === "") {
        setProducts([]);
        return;
      }
      try {
        setLoadingProducts(true);
        const data = await httpManager.productsService.getAll({ search: searchQuery });
        setProducts(data);
      } catch (error) {
        toast.error("Error al buscar productos");
      } finally {
        setLoadingProducts(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Calcular el valor del descuento cuando cambia el tipo o el producto seleccionado
  useEffect(() => {
    if (selectedProduct && formData.type > 0 && selectedProduct.unitPrice !== undefined) {
      const calculatedValue = (selectedProduct.unitPrice * formData.type) / 100;
      setFormData(prev => ({
        ...prev,
        value: parseFloat(calculatedValue.toFixed(2)),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        value: 0,
      }));
    }
  }, [formData.type, selectedProduct]);

  const resetForm = () => {
    setFormData({
      productId: "",
      type: 0,
      value: 0,
      isActive: true,
      startDate: "",
      endDate: "",
    });
    setSearchQuery("");
    setProducts([]);
    setSelectedProductName("");
    setSelectedProduct(null);
  };

  const handleProductSelect = (product: ProductDto) => {
    setFormData(prev => ({
      ...prev,
      productId: product.id || "",
    }));
    setSelectedProductName(product.name || "");
    setSelectedProduct(product);
    setProducts([]);
    setSearchQuery(product.name || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId) {
      toast.error("Debes seleccionar un producto");
      return;
    }
    try {
      await DiscountsService.create(formData);
      toast.success("Descuento creado correctamente");
      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <CommonModal isOpen={isOpen} title="Crear Descuento" onClose={() => { resetForm(); onClose(); }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo: Buscador de Productos */}
        <div>
          <Label htmlFor="productSearch">Buscar Producto *</Label>
          <div className="relative">
            <Input
              id="productSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre de producto..."
            />
            {products.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name} ({product.code}) - ${product.unitPrice}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formData.productId && (
            <div className="mt-2 text-sm text-gray-600">
              Producto seleccionado: <span className="font-medium">{selectedProductName}</span>
            </div>
          )}
        </div>

        {/* Resto de campos */}
        <div>
          <Label htmlFor="type">Tipo (%) *</Label>
          <Input
            id="type"
            name="type"
            type="number"
            min="0"
            max="100"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              type: Number(e.target.value)
            }))}
            required
            placeholder="Ej: 10"
          />
        </div>

        <div>
          <Label htmlFor="value">Valor ($) *</Label>
          <Input
            id="value"
            name="value"
            type="number"
            min="0"
            step="0.01"
            value={formData.value}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              value: Number(e.target.value)
            }))}
            required
            placeholder="Ej: 5.00"
            readOnly // El valor se calcula automáticamente
          />
        </div>

        <div className="flex items-center gap-2">
          <Input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              isActive: e.target.checked
            }))}
            className="w-4 h-4"
          />
          <Label htmlFor="isActive">¿Activo?</Label>
        </div>

        <div>
          <Label htmlFor="startDate">Fecha de Inicio *</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              startDate: e.target.value
            }))}
            required
          />
        </div>

        <div>
          <Label htmlFor="endDate">Fecha de Fin *</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              endDate: e.target.value
            }))}
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => { resetForm(); onClose(); }}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button type="submit" className="cursor-pointer" disabled={!formData.productId}>
            Guardar
          </Button>
        </div>
      </form>
    </CommonModal>
  );
}