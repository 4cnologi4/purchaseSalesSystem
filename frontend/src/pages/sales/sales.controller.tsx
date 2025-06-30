import { useState, useEffect } from "react";
import { SalesView } from "./sales.view";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { Toaster } from "sonner";
import type { SaleDto } from "@/dtos/Sale.dto";
import { httpManager } from "@/services/HttpManager";

export function SalesController() {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSale, setSelectedSale] = useState<SaleDto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await httpManager.salesService.getAll();
      setSales(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al cargar ventas");
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await httpManager.salesService.search(query);
      setSales(data);
    } catch (error) {
      toast.error("Error al buscar ventas");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (sale: SaleDto) => {
    setSelectedSale(sale);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSale) return;
    try {
      await httpManager.salesService.delete(selectedSale.id);
      toast.success("Venta eliminada");
      fetchSales();
    } catch (error) {
      toast.error("Error al eliminar venta");
    } finally {
      setSelectedSale(null);
    }
  };

  const handleSaleCreated = () => {
    fetchSales();
    setSearchQuery("");
  };

  return (
    <>
      <SalesView
        sales={sales}
        loading={loading}
        onSearch={handleSearch}
        onDeleteClick={handleDeleteClick}
        onSaleCreated={handleSaleCreated}
      />
      <ConfirmModal
        isOpen={!!selectedSale}
        title="Eliminar venta"
        message={`¿Eliminar venta de ${selectedSale?.customerName}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedSale(null)}
      />
      <Toaster position="top-right" />
    </>
  );
} 