import con from '@/config/database';
import { Connection } from '@/features/connection/ConnectionEntity';
import { User } from '@/features/user/userEntity';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { MOCK_USERS } from '@/utils/seed/mockups/users.mock';
import { StatusCodes } from 'http-status-codes';
import { authRequest } from './helpers/authRequest';
import { request } from './jest.setup';

describe('USER Enpoints', () => {
  beforeAll(async () => {
    if (!con.isInitialized) {
      await con.initialize();
    }
  });

  beforeEach(async () => {
    return await seed({ exit: false });
  });

  afterAll(async () => {
    return await dropDB();
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
            totalUsers: MOCK_USERS.length,
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
      const invalidUserid = (await con.getRepository(User).count()) + 1;

      await request
        .get(url + '/' + invalidUserid)
        .expect(StatusCodes.NOT_FOUND)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            message: `user with id ${invalidUserid} not found`,
          });
        });
    });
  });

  describe('GET /user/role/:role', () => {
    const url = '/api/v1/user/role/';
    it('should get users with role software developer', async () => {
      const validRole = 'Software Developer';
      const usersWithRole = await con.getRepository(User).find({
        where: {
          roles: {
            name: validRole,
          },
        },
        relations: ['roles'],
      });

      await request
        .get(url + 'software%20developer')
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(usersWithRole.length);
        });
    });

    it('should get no users when role is incorrect', async () => {
      const invalidRole = 'invalid%20role';
      await request
        .get(url + invalidRole)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(0);
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

  describe('DELETE /user/followed/:followedid', () => {
    const url = '/api/v1/user/followed';
    it('should return a 204 response when removing a followed user', async () => {
      const userEmailWhoFollowsPeople = 'email@gmail.com';

      const followedUsers = await con.getRepository(Connection).findOne({
        where: {
          follower: {
            email: userEmailWhoFollowsPeople,
          },
        },
        relations: ['followed'],
      });

      const followedId = followedUsers?.followed.id;

      await authRequest({})
        .delete(url + '/' + followedId)
        .expect(StatusCodes.NO_CONTENT);
    });
  });
});
