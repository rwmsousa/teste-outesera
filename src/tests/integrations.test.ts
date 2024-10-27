import { Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';
import { getProducersWithMinMaxInterval } from '../controllers/producer.controller';

jest.mock('../services/producer.service');

describe('API Integration Testing', () => {
  it('Should return a list of entities', async () => {
    const mockProducers = [
      { id: 1, name: 'Producer 1' },
      { id: 2, name: 'Producer 2' },
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

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
