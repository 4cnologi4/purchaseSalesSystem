import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateSaleProductRequest {
    @IsString()
    @IsOptional()
    productId?: string;

    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity?: number;

    @IsNumber()
    @IsOptional()
    @Min(0.01, { message: 'Unit price must be greater than 0' })
    unitPrice?: number;
}

export class UpdateSaleRequest {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsOptional()
    customerName?: string;

    @IsString()
    @IsOptional()
    customerLastName?: string;

    @IsString()
    @IsOptional()
    customerTaxId?: string;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSaleProductRequest)
    @IsOptional()
    products?: UpdateSaleProductRequest[];

    @IsString()
    @IsOptional()
    updatedByUserId?: string;
}