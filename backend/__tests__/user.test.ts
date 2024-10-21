import con from '@/config/database';
import { USERS_MOCK } from '@/utils/seed/mockups/users.mock';
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
          totalUsers: USERS_MOCK.length,
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

  it('should get one user with role cloud arquitect', async () => {
    const validRole = 'cloud%20architect';
    await request
      .get(url + '?role=' + validRole)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(body).toMatchObject({
          currentPage: 1,
          totalPages: 1,
          totalUsers: 1,
        });
      });
  });

  it('should fail to get user when role is incorrect', async () => {
    const invalidRole = 'invalid%20role';
    await request
      .get(url + '?role=' + invalidRole)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBe(0);
      });
  });
});
