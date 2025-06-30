import type { ProductDto } from "./Product.dto";

export interface DiscountDto {
  id: string;
  productId: string;
  product: ProductDto;
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