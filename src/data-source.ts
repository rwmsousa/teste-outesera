import { DataSource } from 'typeorm';
import { Movie } from './entity/Movie';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: (process.env.DATABASE_TYPE as any) || 'sqlite',
  database: process.env.DATABASE_DATABASE || ':memory:',
  synchronize: true,
  logging: false,
  entities: [Movie],
  migrations: [],
  subscribers: [],
});
