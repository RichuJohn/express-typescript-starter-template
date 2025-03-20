import request from 'supertest';
import { app } from '../index';

describe('Root Endpoint', () => {
  it('should return 200 and welcome message', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Welcome to Express TypeScript API');
    expect(response.body).toHaveProperty('documentation', '/api-docs');
  });
}); 