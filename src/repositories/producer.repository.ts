import { AppDataSource } from '../data-source';
import { Movie } from '../entity/Movie';
import { Movie as MovieType } from '../types';
import { ProducerInterval } from '../types';

export const populateDatabase = async (movies: MovieType[]) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  try {
    for (const movie of movies) {
      const { year, title, studios, producers, winner } = movie;
      const movieEntity = new Movie();
      movieEntity.year = year;
      movieEntity.title = title;
      movieEntity.studios = studios;
      movieEntity.producers = producers;
      movieEntity.winner = winner;
      await movieRepository.save(movieEntity);
    }
  } catch (error) {
    console.error('Error populating the database:', error);
    throw error;
  }
};

export const getProducers = async (): Promise<ProducerInterval[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movies = await movieRepository.find({ where: { winner: true } });

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
