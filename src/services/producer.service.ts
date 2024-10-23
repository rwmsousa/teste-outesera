import { getProducers } from '../repositories/producer.repository';

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

const getMinMaxIntervalProducers = async (): Promise<ProducerInterval[]> => {
  try {
    const producers = await getProducers();
    // logic to calculate the intervals and return the producers with the highest and lowest interval between awards.
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getMinMaxIntervalProducers };
