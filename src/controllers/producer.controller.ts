import { Request, Response } from 'express';
import {
  getMinMaxIntervalProducers,
  ProducerInterval,
} from '../services/producer.service';

const getProducersWithMinMaxInterval = async (req: Request, res: Response) => {
  try {
    const producers: ProducerInterval[] = await getMinMaxIntervalProducers();
    res.json(producers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getProducersWithMinMaxInterval };
