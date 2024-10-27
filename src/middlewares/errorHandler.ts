import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';
import logger from './logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err.stack);

  if (err instanceof QueryFailedError) {
    return res.status(400).json({ error: 'Bad Request', message: err.message });
  }

  if (err.name === 'ValidationError') {
    return res
      .status(422)
      .json({ error: 'Unprocessable Entity', message: err.message });
  }

  if (err.name === 'EntityNotFound') {
    return res.status(404).json({ error: 'Not Found', message: err.message });
  }

  res
    .status(500)
    .json({ error: 'Internal Server Error', message: err.message });
};

export default errorHandler;
