export interface SaleDto {
  id: string;
  customerName: string;
  customerLastName: string;
  customerTaxId?: string;
  total: number;
  paymentMethod: string;
  createdByUserId?: string;
  updatedByUserId?: string;
  createdAt?: string;
  updatedAt?: string;
  products?: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface SaleDetailDto {
  id: string;
  saleId: string;
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
}
