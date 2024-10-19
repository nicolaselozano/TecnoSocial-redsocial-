import { StatusCodes } from 'http-status-codes';
import { request } from './app.test';

describe('GET /api/v1/user', () => {
  const url = '/api/v1/user';

  it('should get all users', async () => {
    await request
      .get(url)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          currentPage: 1,
          totalPages: 1,
          totalUsers: 3,
        });
      });
  });

  it('should get one user using limit query param', async () => {
    await request
      .get(url + '?limit=1')
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body.users.length).toBe(1);
      });
  });

  it('should fail to get user with invalid id', async () => {
    await request
      .get(url + '/4')
      .expect(StatusCodes.NOT_FOUND)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          message: 'user with id 4 not found',
        });
      });
  });

  it.skip('should get all user with role = Software engineer', async () => {
    await request
      .get(url + '?role=software-engineer')
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBe(0);
      });
  });
});
