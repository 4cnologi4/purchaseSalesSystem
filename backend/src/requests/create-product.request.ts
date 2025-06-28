import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01, { message: 'unitPrice must be greater than 0' })
    unitPrice?: number;

    @IsNumber()
    @IsNotEmpty()
    unitOfMeasureId?: number;

    @IsString()
    @IsOptional()
    createdByUserId?: string;

    @IsString()
    @IsOptional()
    updatedByUserId?: string;
}