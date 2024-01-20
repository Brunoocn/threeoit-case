import { Injectable } from '@nestjs/common';
import { IMathOperationsRepository } from '../abstract/mathRepository.dto';
import { ICalculate } from '../abstract/IMathOperations.repository';
import { MATH_OPERATIONS } from 'src/shared/enums/math_operations_enum';
import { MapGetOrThrow } from 'src/shared/utils/map_get_or_throw';

@Injectable()
export class MathOperationsRepository implements IMathOperationsRepository {
  constructor() {}

  calculate({ number1, number2, operation }: ICalculate): number {
    const mathOperation = this.mathOperationsMapper.get(operation);

    if (!mathOperation) {
      throw new Error('Operação não encontrada');
    }

    return mathOperation(number1, number2);
  }

  private sum(a: number, b: number): number {
    return a + b;
  }

  private sub(a: number, b: number): number {
    return a - b;
  }

  private mult(a: number, b: number): number {
    return a * b;
  }

  private div(a: number, b: number): number {
    return a / b;
  }

  private mathOperationsMapper = new MapGetOrThrow([
    [MATH_OPERATIONS.sum, this.sum],
    [MATH_OPERATIONS.sub, this.sub],
    [MATH_OPERATIONS.mult, this.mult],
    [MATH_OPERATIONS.div, this.div],
  ]);
}

