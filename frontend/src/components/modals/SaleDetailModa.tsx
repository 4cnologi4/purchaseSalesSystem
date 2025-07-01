import { useEffect, useState } from "react";
import { CommonModal } from "./CommonModal";
import { httpManager } from "@/services/HttpManager";
import type { SaleDto } from "@/dtos/Sale.dto";
import { Button } from "../ui/button";
import { Table } from "../ui/common-table";
import { toast } from "sonner";

interface SaleDetailModalProps {
    saleId: string;
    isOpen: boolean;
    onClose: () => void;
}

export function SaleDetailModal({ saleId, isOpen, onClose }: SaleDetailModalProps) {
    const [sale, setSale] = useState<SaleDto | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && saleId) {
            fetchSaleDetails();
        }
    }, [isOpen, saleId]);

    const fetchSaleDetails = async () => {
        try {
            setLoading(true);
            const data = await httpManager.salesService.getById(saleId);
            setSale(data);
        } catch (error) {
            toast.error("Error al cargar detalles de la venta");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: "productName",
            header: "Producto",
            render: (detail: any) => detail.product?.name || "N/A" // Acceso seguro al nombre
        },
        {
            key: "quantity",
            header: "Cantidad"
        },
        {
            key: "unitPrice",
            header: "P. Unitario"
        },
        {
            key: "subtotal",
            header: "Subtotal"
        },
        {
            key: "discount",
            header: "Descuento",
            render: (detail: any) => `${detail.discount}%`
        },
        {
            key: "total",
            header: "Total"
        },
    ];

    return (
        <CommonModal
            isOpen={isOpen}
            title={`Detalles de Venta #${sale?.id || ''}`}
            onClose={onClose}
        >
            <div className="space-y-4">
                {loading ? (
                    <p>Cargando detalles...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <h3 className="font-medium">Cliente:</h3>
                                <p>{sale?.customerName} {sale?.customerLastName}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Total:</h3>
                                <p>${sale?.total}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Método de Pago:</h3>
                                <p>{sale?.paymentMethod}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Fecha:</h3>
                                <p>{new Date(sale?.createdAt || '').toLocaleString()}</p>
                            </div>
                        </div>

                        <h3 className="font-medium mb-2">Productos:</h3>
                        {sale?.details?.length ? (
                            <Table
                                columns={columns}
                                data={sale.details}
                            />
                        ) : (
                            <p className="text-gray-500">No hay productos registrados</p>
                        )}

                        <div className="flex justify-end mt-6">
                            <Button onClick={onClose} variant="outline" className="cursor-pointer">
                                Cerrar
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </CommonModal>
    );
}
