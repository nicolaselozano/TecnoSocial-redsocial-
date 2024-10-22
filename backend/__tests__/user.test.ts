import con from '@/config/database';
import { User } from '@/features/user/userEntity';
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

describe('GET /user/:id/followers', () => {
  const baseUrl = '/api/v1/user';

  it('should return 404 error when user id is invalid', async () => {
    const invalidUserid = 9999;

    await request.get(baseUrl + `/${invalidUserid}/followers`).expect(StatusCodes.NOT_FOUND);
  });

  it('should return 200 request with a list of followers from a user with 1 followers', async () => {
    const userWithOneFollower = await con.getRepository(User).findOne({ where: { name: 'username' } });

    await request
      .get(baseUrl + `/${userWithOneFollower?.id}/followers`)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body.totalUsers).toBe(1);
      });
  });
});

describe('GET /user/:id/followed', () => {
  const baseUrl = '/api/v1/user';

  it('should return 404 error when user id is invalid', async () => {
    const invalidUserid = 9999;

    await request.get(baseUrl + `/${invalidUserid}/followed`).expect(StatusCodes.NOT_FOUND);
  });

  it('should return 200 request with a list of followed from a user with 2 followed', async () => {
    const userWithTwoFollowed = await con.getRepository(User).findOne({ where: { name: 'username' } });

    await request
      .get(baseUrl + `/${userWithTwoFollowed?.id}/followed`)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body.totalUsers).toBe(2);
      });
  });
});
