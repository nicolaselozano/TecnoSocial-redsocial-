import con from '@/config/database';
import { Like } from '@/features/like/likeEntity';
import { User } from '@/features/user/userEntity';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { totalPosts } from '@/utils/seed/mockups/posts.mock';
import { StatusCodes } from 'http-status-codes';
import { authRequest } from './helpers/authRequest';
import { request } from './jest.setup';

describe('LIKE Endpoints', () => {
  beforeAll(async () => {
    if (!con.isInitialized) {
      await con.initialize();
    }
  });

  beforeEach(async () => {
    return await seed({ exit: false });
  });

  afterEach(async () => {
    return await dropDB();
  });

  describe('GET /like/user/:userid', () => {
    const url = '/api/v1/like/user';
    it('should return a 200 response with a list of liked posts', async () => {
      const userWithOneLike = await con.getRepository(User).findOne({ where: { name: 'username' } });
      const likes = await con.getRepository(Like).find({
        where: {
          user: { id: userWithOneLike?.id },
        },
      });

      await request
        .get(url + '/' + userWithOneLike?.id)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.results)).toBe(true);
          expect(body.results.length).toBe(likes.length);
        });
    });
  });

  describe('POST /post/:id/like', () => {
    const url = '/api/v1/post';

    it('should return a 201 request when liking a post with authenticated user', async () => {
      await authRequest()
        .post(url + '/' + 1 + '/like')
        .expect(StatusCodes.CREATED);
    });

    it('should return a 404 request when liking an invalid post with authenticated user', async () => {
      await authRequest()
        .post(url + '/' + (totalPosts + 1) + '/like')
        .expect(StatusCodes.NOT_FOUND);
    });

    it('should return a 401 request when auth token is not provided', async () => {
      await request.post(url + '/' + 1 + '/like').expect(StatusCodes.UNAUTHORIZED);
    });
  });
});
