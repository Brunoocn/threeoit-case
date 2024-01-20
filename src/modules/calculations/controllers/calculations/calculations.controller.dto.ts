import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CalculationsDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly number1: number;

  @IsNotEmpty()
  @IsNumber()
  readonly number2: number;

  @IsNotEmpty()
  @IsString()
  readonly operation: 'sum' | 'sub' | 'mult' | 'div';
}
