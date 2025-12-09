import { Module } from '@nestjs/common';
import { validationSchema } from 'src/config/config.validation';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassesModule } from './modules/classes/classes.module';
import { SchoolsModule } from './modules/schools/schools.module';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    UsersModule,
    AuthModule,
    ClassesModule,
    SchoolsModule,
  ],
})
export class AppModule {}
