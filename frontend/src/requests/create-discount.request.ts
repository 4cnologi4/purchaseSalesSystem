export interface CreateDiscountRequest {
  productId: string;
  type: number;
  value: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
} 