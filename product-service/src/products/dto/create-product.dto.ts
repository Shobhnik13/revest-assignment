import { IsString, IsNumber, Min, IsOptional, IsObject } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    sku: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsObject()
    attributes?: Record<string, any>;
}
