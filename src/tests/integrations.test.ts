import { Request, Response } from 'express';
import { getMinMaxIntervalProducers } from '../services/producer.service';
import { getProducersWithMinMaxInterval } from '../controllers/producer.controller';

jest.mock('../services/producer.service');

describe('Testes de Integração de API', () => {
  it('Deve retornar uma lista de entidades', async () => {
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

    await getProducersWithMinMaxInterval(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducers);
  });

  it('Deve retornar um erro 500 se o serviço falhar', async () => {
    (getMinMaxIntervalProducers as jest.Mock).mockRejectedValue(
      new Error('Service Error'),
    );

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getProducersWithMinMaxInterval(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
