import fs from 'fs';
import csv from 'csv-parser';
import { Movie, CsvMovie } from '../types';

const readCsvData = (filePath: string): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    const movies: Movie[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data: CsvMovie) => {
        const year = parseInt(data.year, 10);
        if (isNaN(year)) {
          console.error(`Invalid year value: ${data.year}`);
          return;
        }
        movies.push({
          year,
          title: data.title || 'Unknown Title',
          studios: data.studios || 'Unknown Studios',
          producers: data.producers || 'Unknown Producers',
          winner: data.winner?.toLowerCase() === 'yes',
        });
      })
      .on('end', () => resolve(movies))
      .on('error', (error: Error) => reject(error));
  });
};

export default readCsvData;
