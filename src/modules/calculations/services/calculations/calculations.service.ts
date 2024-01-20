import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES_NAME } from 'src/shared/enums/repository_enum';
import { IMathOperationsRepository } from '../../implementations/abstract/mathRepository.dto';
import { ICalculateOperationDTO } from './calculations.dto';

@Injectable()
export class CalculationsService {
  constructor(
    @Inject(REPOSITORIES_NAME.math_repository)
    private mathOperationsRepository: IMathOperationsRepository,
  ) {}

  execute({ number1, number2, operation }: ICalculateOperationDTO) {
    const result = this.mathOperationsRepository.calculate({
      number1,
      number2,
      operation,
    });

    return result;
  }
}

