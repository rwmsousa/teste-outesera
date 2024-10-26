import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { getProducersWithMinMaxInterval } from './controllers/producer.controller';
import readCsvData from './utils/readCsvData';
import { populateDatabase } from './repositories/producer.repository';
import path from 'path';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

setupSwagger(app);

AppDataSource.initialize()
  .then(async () => {
    const csvFilePath = path.resolve(__dirname, '../resources/movielist.csv');
    const movies = await readCsvData(csvFilePath);
    await populateDatabase(movies);

    app.get('/producers', (req: Request, res: Response) =>
      getProducersWithMinMaxInterval(req, res),
    );

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => console.log(error));

export { app };
