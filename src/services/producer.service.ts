import { getProducers } from '../repositories/producer.repository';
import { ProducerInterval } from '../types';

interface ProducerIntervalResult {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

const getMinMaxIntervalProducers = async (): Promise<{
  min: ProducerIntervalResult[];
  max: ProducerIntervalResult[];
}> => {
  try {
    const producers = await getProducers();

    const producerIntervals: ProducerIntervalResult[] = [];

    for (const producerData of producers) {
      const { producer, years } = producerData;
      for (let i = 1; i < years.length; i++) {
        const interval = years[i] - years[i - 1];
        producerIntervals.push({
          producer,
          interval,
          previousWin: years[i - 1],
          followingWin: years[i],
        });
      }
    }

    const sortedProducers = producerIntervals.sort(
      (a, b) => a.interval - b.interval,
    );
    const minIntervalProducers = sortedProducers.filter(
      (p) => p.interval === sortedProducers[0].interval,
    );
    const maxIntervalProducers = sortedProducers.filter(
      (p) =>
        p.interval === sortedProducers[sortedProducers.length - 1].interval,
    );

    return { min: minIntervalProducers, max: maxIntervalProducers };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getMinMaxIntervalProducers };
