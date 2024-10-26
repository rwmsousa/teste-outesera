import request from 'supertest';
import { app } from '../index';

describe('GET /producers', () => {
  it('should return the producers with min and max intervals', async () => {
    const response = await request(app).get('/producers');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
  });
});
