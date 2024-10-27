import { getProducers } from '../repositories/producer.repository';

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
      const uniqueYears = Array.from(new Set<number>(years)).sort(
        (a, b) => a - b,
      );
      for (let i = 1; i < uniqueYears.length; i++) {
        const interval = uniqueYears[i] - uniqueYears[i - 1];
        producerIntervals.push({
          producer,
          interval,
          previousWin: uniqueYears[i - 1],
          followingWin: uniqueYears[i],
        });
      }
    }

    if (producerIntervals.length === 0) {
      return { min: [], max: [] };
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
