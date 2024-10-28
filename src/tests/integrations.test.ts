import { Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';
import { getProducersWithMinMaxInterval } from '../controllers/producer.controller';

jest.mock('../services/producer.service');

describe('API Integration Testing', () => {
  it('Should return a list of entities', async () => {
    const mockProducers = [
      {
        id: 1,
        year: 2017,
        title: 'Movie 1',
        studios: 'Studio 1',
        producers: 'Producer 1',
        winner: false,
      },
      {
        id: 2,
        year: 2018,
        title: 'Movie 2',
        studios: 'Studio 2',
        producers: 'Producer 2',
        winner: true,
      },
    ];
    (getMinMaxIntervalProducers as jest.Mock).mockResolvedValue(mockProducers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();
    await getProducersWithMinMaxInterval(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducers);
  });

  it('Should return a 500 error if the service fails', async () => {
    (getMinMaxIntervalProducers as jest.Mock).mockRejectedValue(
      new Error('Service Error'),
    );

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();
    await getProducersWithMinMaxInterval(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('Service Error'));
  });
});
