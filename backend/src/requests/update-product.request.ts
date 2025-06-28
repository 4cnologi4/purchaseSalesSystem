import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProductRequest {
    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    @Min(0.01, { message: 'unitPrice must be greater than 0' })
    unitPrice?: number;

    @IsNumber()
    @IsOptional()
    unitOfMeasureId?: number;
} 