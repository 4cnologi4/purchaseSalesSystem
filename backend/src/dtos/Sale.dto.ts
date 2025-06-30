export interface SaleDto {
  id: string;
  customerName: string;
  customerLastName: string;
  customerTaxId?: string;
  total: number;
  paymentMethod: string;
  createdByUserId: string;
  updatedByUserId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SaleDetailDto {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
}
