import { NextFunction, Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';
import logger from '../middlewares/logger';

export const getProducersWithMinMaxInterval = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const producers = await getMinMaxIntervalProducers();
    res.status(200).json(producers);
  } catch (error: any) {
    logger.error(
      'Error fetching producers with min/max interval: ' + error.message,
    );
    next(error);
  }
};
