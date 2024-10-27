import fs from 'fs';
import csv from 'csv-parser';
import { Movie } from '../entity/Movie';
import logger from '../middlewares/logger';

const readCsvData = (filePath: string): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    const movies: Movie[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data: any) => {
        const year = parseInt(data.year, 10);
        if (isNaN(year)) {
          logger.error(`Invalid year value: ${data.year}`);
          return;
        }
        movies.push(
          new Movie(
            year,
            data.title || 'Unknown Title',
            data.studios || 'Unknown Studios',
            data.producers || 'Unknown Producers',
            data.winner?.toLowerCase() === 'yes',
          ),
        );
      })
      .on('end', () => resolve(movies))
      .on('error', (error: Error) => reject(error));
  });
};

export default readCsvData;
