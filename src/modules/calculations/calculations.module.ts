import { Module } from '@nestjs/common';
import { CalculationsController } from './controllers/calculations/calculations.controller';
import { CalculationsService } from './services/calculations/calculations.service';
import { REPOSITORIES_NAME } from 'src/shared/enums/repository_enum';
import { MathOperationsRepository } from './implementations/implementations/math-operations.service';

@Module({
  imports: [],
  controllers: [CalculationsController],
  providers: [
    {
      provide: REPOSITORIES_NAME.math_repository,
      useClass: MathOperationsRepository,
    },
    CalculationsService,
  ],
})
export class CalculationsModule {}
