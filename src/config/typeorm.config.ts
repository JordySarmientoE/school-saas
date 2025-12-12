import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(String(process.env.DB_PORT), 10) ?? 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeoutMS: 5000,

  entities: [join(__dirname, '../**/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',

  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',

  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

export default typeOrmConfig;
