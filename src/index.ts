import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { getProducersWithMinMaxInterval } from './controllers/producer.controller';
import readCsvData from './utils/readCsvData';
import { populateDatabase } from './repositories/producer.repository';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(async () => {
    const csvFilePath = path.resolve(__dirname, '../resources/movielist.csv');
    const movies = await readCsvData(csvFilePath);
    await populateDatabase(movies);

    app.get('/producers', getProducersWithMinMaxInterval);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

export { app };
