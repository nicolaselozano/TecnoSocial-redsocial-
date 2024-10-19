import { app } from '@/app';
import supertest from 'supertest';

const request = supertest(app);

test('GET /health', async () => {
  await request.get('/api/health').expect(200);
  expect(2).toBe(2);
});
