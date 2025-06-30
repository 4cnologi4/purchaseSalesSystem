export interface DiscountDto {
  id: string;
  productId: string;
  type: number;
  value: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdByUserId: string;
  updatedByUserId: string;
  createdAt: string;
  updatedAt: string;
} 