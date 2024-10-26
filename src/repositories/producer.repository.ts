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
    console.error('Erro ao popular o banco de dados:', error);
    throw error;
  }
};

export const getProducers = async (): Promise<ProducerInterval[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  return [
    {
      producer: 'Producer 1',
      interval: 5,
      previousWin: 2000,
      followingWin: 2005,
      years: [2000, 2005],
    },
    {
      producer: 'Producer 2',
      interval: 3,
      previousWin: 2010,
      followingWin: 2013,
      years: [2010, 2013],
    },
  ];
};
