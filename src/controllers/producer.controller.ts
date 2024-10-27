import { Request, Response, NextFunction } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';

export const getProducersWithMinMaxInterval = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getMinMaxIntervalProducers();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
