import * as fs from 'fs';
import csv from 'csv-parser';

interface Movie {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

const readCsvData = async (filePath: string): Promise<Movie[]> => {
  const movies: Movie[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: Movie) => movies.push(data))
      .on('end', () => resolve(movies))
      .on('error', reject);
  });
};

export default readCsvData;
