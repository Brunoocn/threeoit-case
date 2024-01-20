import { Body, Controller, Post } from '@nestjs/common';
import { CalculationsService } from '../../services/calculations/calculations.service';
import { CalculationsDTO } from './calculations.controller.dto';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post('/calculate')
  calculate(
    @Body()
    { number1, number2, operation }: CalculationsDTO,
  ): Number {
    const result = this.calculationsService.execute({
      number1,
      number2,
      operation,
    });

    return result;
  }
}

