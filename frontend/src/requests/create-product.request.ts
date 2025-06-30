export interface CreateProductRequest {
  code: string;
  name: string;
  description?: string;
  unitPrice: number;
  unitOfMeasureId: number;
  isActive?: boolean;
} 