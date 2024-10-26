import { Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';

export const getProducersWithMinMaxInterval = async (
  req: Request,
  res: Response,
) => {
  try {
    const producers = await getMinMaxIntervalProducers();
    res.status(200).json(producers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
