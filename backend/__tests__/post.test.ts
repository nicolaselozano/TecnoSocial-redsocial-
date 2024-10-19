import { StatusCodes } from 'http-status-codes';
import { request } from './app.test';

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
