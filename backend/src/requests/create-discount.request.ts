import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, IsBoolean } from 'class-validator';

export class CreateDiscountRequest {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @IsNotEmpty()
    type!: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01, { message: 'value must be greater than 0' })
    value!: number;

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean;

    @IsString()
    @IsNotEmpty()
    startDate!: Date;

    @IsString()
    @IsNotEmpty()
    endDate!: Date;

    @IsString()
    @IsOptional()
    createdByUserId?: string;

    @IsString()
    @IsOptional()
    updatedByUserId?: string;
} 