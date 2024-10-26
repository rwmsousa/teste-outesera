import { Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';

export const getProducersWithMinMaxInterval = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getMinMaxIntervalProducers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
