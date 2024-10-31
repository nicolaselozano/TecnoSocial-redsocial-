import con from '@/config/database';
import { Like } from '@/features/like/likeEntity';
import { Post } from '@/features/post/postEntity';
import { User } from '@/features/user/userEntity';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
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

  describe('POST /api/v1/post/:id/like', () => {
    const url = '/api/v1/post/';

    it('should return a 201 response when user likes a post', async () => {
      const userEmailWithNoLikedPosts = 'ezequiel@gmail.com';
      const notLikedPost = await con.getRepository(Post).findOne({
        where: {
          user: { email: userEmailWithNoLikedPosts },
        },
      });

      await authRequest({})
        .post(url + notLikedPost?.id + '/like')
        .expect(StatusCodes.CREATED);
    });

    it('should return a 401 response when auth token is not provided', async () => {
      await request.post(url + 1 + '/like').expect(StatusCodes.UNAUTHORIZED);
    });

    it('should return a 404 response when post id is invalid', async () => {
      const invalidId = 9999;

      await authRequest({})
        .post(url + invalidId + '/like')
        .expect(StatusCodes.NOT_FOUND);
    });

    it('should return a 409 response when user has already liked the post', async () => {
      const userEmail = 'email@gmail.com';
      const alreadyLikedPost = await con.getRepository(Like).findOne({
        where: {
          user: {
            email: userEmail,
          },
        },
        relations: ['user', 'post'],
      });

      await authRequest({})
        .post(url + alreadyLikedPost?.post.id + '/like')
        .expect(StatusCodes.CONFLICT);
    });
  });

  describe('DELETE /api/v1/post/:id/like', () => {
    const url = '/api/v1/post/';
    it('should return a 204 response when deleting a like from a post', async () => {
      const userEmail = 'email@gmail.com';
      const likedPost = await con.getRepository(Like).findOne({
        where: {
          user: {
            email: userEmail,
          },
        },
        relations: ['user', 'post'],
      });

      await authRequest({})
        .delete(url + likedPost?.post?.id + '/like')
        .expect(StatusCodes.NO_CONTENT);
    });
    it('should return a 404 response when deleting an unexisting like from a post', async () => {
      const userEmailWithNoLikedPosts = 'ezequiel@gmail.com';

      const postWithoutLike = await con.getRepository(Post).findOne({
        where: {
          user: {
            email: userEmailWithNoLikedPosts,
          },
        },
      });

      await authRequest({})
        .delete(url + postWithoutLike?.id + '/like')
        .expect(StatusCodes.NOT_FOUND);
    });
    it('should return a 401 response when auth token is not provided', async () => {
      const validPostId = 1;

      await request.delete(url + validPostId + '/like').expect(StatusCodes.UNAUTHORIZED);
    });
  });
});
