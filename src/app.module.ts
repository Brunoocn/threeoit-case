import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/auth/database/models/User.model';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './commom/jwtGuard/jwt-auth.guard';
import { CalculationsModule } from './modules/calculations/calculations.module';
import { JwtStrategy } from './commom/jwtGuard/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db/data.sqlite3',
      autoLoadModels: true,
      synchronize: true,
      models: [User],
    }),
    AuthModule,
    CalculationsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}

