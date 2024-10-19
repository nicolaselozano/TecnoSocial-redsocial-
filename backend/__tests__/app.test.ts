import { app } from '@/app';
import con from '@/config/database';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';

export const request = supertest(app);

beforeAll(async () => {
  await con.initialize();
});

afterAll(async () => {
  await con.destroy();
});

describe('GET /api/health', () => {
  const url = '/api/health';

  it('should be healthy', async () => {
    await request.get(url).expect(StatusCodes.OK);
  });
});
