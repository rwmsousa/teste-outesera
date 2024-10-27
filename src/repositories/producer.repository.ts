import { AppDataSource } from '../data-source';
import { Movie } from '../entity/Movie';
import { ProducerInterval } from '../types';
import logger from '../middlewares/logger';

export const populateDatabase = async (movies: Movie[]): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  try {
    await movieRepository.save(movies);
    logger.info('Database populated successfully');
  } catch (error) {
    logger.error('Error populating the database:', error);
    throw error;
  }
};

const mapProducers = (movies: Movie[]): { [key: string]: number[] } => {
  const producerMap: { [key: string]: number[] } = {};

  movies.forEach((movie) => {
    const producers = movie.producers.split(',').map((p) => p.trim());
    producers.forEach((producer) => {
      if (!producerMap[producer]) {
        producerMap[producer] = [];
      }
      producerMap[producer].push(movie.year);
    });
  });

  return producerMap;
};

const createProducerIntervals = (producerMap: {
  [key: string]: number[];
}): ProducerInterval[] => {
  const producerIntervals: ProducerInterval[] = [];
  for (const producer in producerMap) {
    const years = producerMap[producer].sort((a, b) => a - b);
    producerIntervals.push({
      producer,
      interval: 0,
      previousWin: 0,
      followingWin: 0,
      years,
    });
  }
  return producerIntervals;
};

export const getProducers = async (): Promise<ProducerInterval[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  try {
    const movies = await movieRepository.find();
    const producerMap = mapProducers(movies);
    return createProducerIntervals(producerMap);
  } catch (error) {
    logger.error('Error getting producers:', error);
    throw error;
  }
};
