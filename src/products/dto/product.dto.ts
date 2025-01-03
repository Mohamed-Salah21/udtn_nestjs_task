import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  price: string;

  @IsNumber()
  @Min(1)
  stock: string;
}
