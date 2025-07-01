import { Table } from "@/components/ui/common-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdDeleteForever, MdSearch, MdAdd, MdRemoveRedEye } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { SaleDto } from "@/dtos/Sale.dto";
import { useState } from "react";
import { RegisterSaleModal } from "@/components/modals/RegisterSaleModal";
import { SaleDetailModal } from "@/components/modals/SaleDetailModa";

interface SalesViewProps {
  sales: SaleDto[];
  loading: boolean;
  onSearch: (query: string) => void;
  onDeleteClick: (sale: SaleDto) => void;
  onSaleCreated: () => void;
}

export function SalesView({ sales, loading, onSearch, onDeleteClick, onSaleCreated }: SalesViewProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(localSearchQuery);
    }
  };

  const columns = [
    { key: "customerName", header: "Cliente" },
    { key: "total", header: "Total" },
    { key: "paymentMethod", header: "Método de pago" },
    {
      key: "actions",
      header: "Acciones",
      render: (sale: SaleDto) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedSaleId(sale.id)}
              className="cursor-pointer"
            >
              <MdRemoveRedEye className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver detalle</TooltipContent>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <Button
          onClick={() => setIsRegisterModalOpen(true)}
          className="cursor-pointer"
        >
          <MdAdd className="mr-2 h-4 w-4" />
          Registrar Venta
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Buscar ventas..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-12"
          />
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer absolute right-0 top-0 h-full px-3 bg-blue-600 hover:bg-blue-700"
            onClick={() => onSearch(localSearchQuery)}
          >
            <MdSearch className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Cargando ventas...</p>
      ) : (
        <Table columns={columns} data={sales} />
      )}

      <RegisterSaleModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={onSaleCreated}
      />

      <SaleDetailModal
        saleId={selectedSaleId || ""}
        isOpen={!!selectedSaleId}
        onClose={() => setSelectedSaleId(null)}
      />
    </div>
  );
} 