import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  item: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsNumber()
  @Min(0)
  price: number;
}
