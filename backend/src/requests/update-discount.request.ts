import { IsString, IsOptional, IsNumber, Min, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateDiscountRequest {
    @IsString()
    @IsOptional()
    productId?: string;

    @IsNumber()
    @IsOptional()
    type?: number;

    @IsNumber()
    @IsOptional()
    @Min(0.01, { message: 'value must be greater than 0' })
    value?: number;

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean;

    @IsString()
    @IsOptional()
    startDate?: Date;

    @IsString()
    @IsOptional()
    endDate?: Date;

    @IsString()
    @IsOptional()
    updatedByUserId?: string;
} 