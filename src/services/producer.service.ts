import { getProducers } from '../repositories/producer.repository';
import { ProducerInterval } from '../types';

interface ProducerIntervalResult {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const getMinMaxIntervalProducers = async (): Promise<{
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
    const filteredProducers = sortedProducers.filter((p) => p.interval > 0);

    const minInterval =
      filteredProducers.length > 0 ? filteredProducers[0].interval : 0;

    const minIntervalProducers = filteredProducers.filter(
      (p) => p.interval === minInterval,
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
