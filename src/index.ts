import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { getProducersWithMinMaxInterval } from './controllers/producer.controller';
import readCsvData from './utils/readCsvData';
import { populateDatabase } from './repositories/producer.repository';
import path from 'path';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import { Movie } from './entity/Movie';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

setupSwagger(app);

app.get('/', (_req: Request, res: Response) => {
  res.send('Outsera Challenge: Movie Producer API');
});

AppDataSource.initialize()
  .then(async () => {
    const csvFilePath = path.resolve(
      __dirname,
      '../src/resources/movielist.csv',
    );
    const movies: Movie[] = await readCsvData(csvFilePath);
    await populateDatabase(movies);

    app.get('/producers', (req: Request, res: Response, next: NextFunction) =>
      getProducersWithMinMaxInterval(req, res, next),
    );

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => logger.error(error));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
