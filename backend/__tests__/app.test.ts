import { app } from '@/app';
import con from '@/config/database';
import supertest from 'supertest';

export const request = supertest(app);

beforeAll(async () => {
  await con.initialize();
});

afterAll(async () => {
  await con.destroy();
});

describe('health check', () => {
  const url = '/api/health';

  it('should be healthy', async () => {
    await request.get(url).expect(200);
    expect(2).toBe(2);
  });
});
