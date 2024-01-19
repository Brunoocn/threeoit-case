import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/auth/database/models/User.model';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: '.db/data.sqlite3',
      autoLoadModels: true,
      synchronize: false,
      models: [User],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

