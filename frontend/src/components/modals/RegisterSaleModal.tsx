import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CommonModal } from "./CommonModal";
import { httpManager } from "@/services/HttpManager";
import { toast } from "sonner";
import type { ProductDto } from "@/dtos/Product.dto";
import { Table } from "../ui/common-table";

interface RegisterSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegisterSaleModal({ isOpen, onClose, onSuccess }: RegisterSaleModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerLastName: "",
    customerTaxId: "",
    paymentMethod: "cash",
  });
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    product: ProductDto;
    quantity: number;
  }>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const data = await httpManager.productsService.getAll({
        search: searchQuery
      });
      setProducts(data);
    } catch (error) {
      toast.error("Error al buscar productos");
    }
  };

  const handleAddProduct = (product: ProductDto) => {
    if (!selectedProducts.some((p) => p.product.id === product.id)) {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      // Calcular el total
      const total = selectedProducts.reduce(
        (sum, { product, quantity }) => sum + ((product.unitPrice || 0) * quantity),
        0
      );

      // Validar y transformar unitPrice a number
      const validatedProducts = selectedProducts.map(({ product, quantity }) => {
        if (!product.id || !product.unitPrice) {
          throw new Error("Producto inválido: falta ID o precio");
        }
        return {
          productId: product.id,
          quantity,
          unitPrice: Number(product.unitPrice) // Convertir a number
        };
      });

      const saleData = {
        customerName: formData.customerName,
        customerLastName: formData.customerLastName,
        customerTaxId: formData.customerTaxId,
        paymentMethod: formData.paymentMethod,
        total,
        products: validatedProducts
      };

      await httpManager.salesService.create(saleData);
      toast.success("Venta registrada correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al registrar la venta");
    }
  };

  return (
    <CommonModal 
      isOpen={isOpen} 
      title="Registrar Venta" 
      onClose={onClose}
    >
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Datos del cliente */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Nombre</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="customerLastName">Apellido</Label>
            <Input
              id="customerLastName"
              value={formData.customerLastName}
              onChange={(e) =>
                setFormData({ ...formData, customerLastName: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="customerTaxId">NIT</Label>
          <Input
            id="customerTaxId"
            value={formData.customerTaxId}
            onChange={(e) =>
              setFormData({ ...formData, customerTaxId: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="paymentMethod">Método de Pago</Label>
          <Input
            id="paymentMethod"
            value="Efectivo"
            disabled
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
          />
        </div>

        {/* Búsqueda de productos */}
        <div className="mt-6">
          <Label>Agregar Productos</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleSearch}>
              Buscar
            </Button>
          </div>

          {/* Lista de productos encontrados */}
          {products.length > 0 && (
            <div className="mt-4">
              <Table
                columns={[
                  { key: "name", header: "Nombre" },
                  { key: "unitPrice", header: "Precio" },
                  {
                    key: "actions",
                    header: "Acción",
                    render: (product: ProductDto) => (
                      <Button
                        size="sm"
                        onClick={() => handleAddProduct(product)}
                      >
                        Agregar
                      </Button>
                    ),
                  },
                ]}
                data={products}
              />
            </div>
          )}

          {/* Productos seleccionados */}
          {selectedProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Productos seleccionados</h3>
              <Table
                columns={[
                  { key: "product.name", header: "Producto" },
                  {
                    key: "quantity",
                    header: "Cantidad",
                    render: (item) => (
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-20"
                      />
                    ),
                  },
                  { 
                    key: "product.unitPrice", 
                    header: "P. Unitario", 
                    render: (item) => `$${item.product.unitPrice}` 
                  },
                  {
                    key: "subtotal",
                    header: "Subtotal",
                    render: (item) =>
                      `$${(item.product.unitPrice * item.quantity).toFixed(2)}`,
                  },
                ]}
                data={selectedProducts}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Registrar Venta</Button>
        </div>
      </div>
    </CommonModal>
  );
}