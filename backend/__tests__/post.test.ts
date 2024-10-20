import con from '@/config/database';
import { StatusCodes } from 'http-status-codes';
import { request } from './jest.setup';

beforeAll(async () => {
  if (!con.isInitialized) {
    await con.initialize();
  }
});

afterAll(async () => {
  await con.destroy();
});

describe('POST /api/v1/post', () => {
  const url = '/api/v1/post';

  it('should get an 401 response when auth token is not provided', async () => {
    await request
      .post(url)
      .send({
        title: 'Nuevo post',
      })
      .expect(StatusCodes.UNAUTHORIZED);
  });
});

describe('GET /api/v1/post', () => {
  const url = '/api/v1/post';

  it('should get a 200 response with a list of posts', async () => {
    await request
      .get(url)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(Array.isArray(body.results)).toBe(true);
      });
  });
});
