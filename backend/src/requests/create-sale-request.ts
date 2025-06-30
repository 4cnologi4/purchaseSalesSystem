import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class SaleProductRequest {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01, { message: 'Unit price must be greater than 0' })
    unitPrice!: number;
}

export class CreateSaleRequest {
    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsString()
    @IsNotEmpty()
    customerLastName!: string;

    @IsString()
    @IsOptional()
    customerTaxId?: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleProductRequest)
    products!: SaleProductRequest[];

    @IsString()
    @IsOptional()
    createdByUserId?: string;

    @IsString()
    @IsOptional()
    updatedByUserId?: string;
}
