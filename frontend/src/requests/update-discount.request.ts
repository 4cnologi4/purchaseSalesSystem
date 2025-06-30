export interface UpdateDiscountRequest {
  productId?: string;
  type?: number;
  value?: number;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  productName?: string;
} 