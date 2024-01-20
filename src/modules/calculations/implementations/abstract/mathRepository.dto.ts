import { ICalculate } from './IMathOperations.repository';

export interface IMathOperationsRepository {
  calculate(data: ICalculate): Number;
}
