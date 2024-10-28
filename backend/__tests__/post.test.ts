import con from '@/config/database';
import { Post } from '@/features/post/postEntity';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { FIRST_USER_POSTS, totalPosts } from '@/utils/seed/mockups/posts.mock';
import { StatusCodes } from 'http-status-codes';
import { authRequest } from './helpers/authRequest';
import { request } from './jest.setup';

describe('POST Endpoints', () => {
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

    it('should get an 201 response', async () => {
      const post = FIRST_USER_POSTS[0];

      await authRequest({})
        .post(url)
        .send({
          title: post.title,
          content: post.content,
        })
        .expect(StatusCodes.CREATED)
        .expect(({ body }) => {
          expect(body.id).toBe(totalPosts + 1);
        });
    });

    it.skip('should get an error when title is too short', async () => {
      await authRequest({})
        .post(url)
        .send({
          title: 'a',
          content: 'validddd',
        })
        .expect(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/post/me', () => {
    const url = '/api/v1/post/me';

    it('should get a 200 response with a list of posts', async () => {
      await authRequest({})
        .get(url)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.results)).toBe(true);
          expect(body.totalPosts).toBe(totalPosts);
        });
    });
  });

  describe('GET /api/v1/post/:id', () => {
    const url = '/api/v1/post/';
    it('should get a 200 response when looking for a valid id', async () => {
      const validPostId = 1;
      await request
        .get(url + validPostId)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(body.id).toBe(validPostId);
        });
    });

    it('should get a 404 response when looking for an invalid id', async () => {
      const invalidPostid = 9999;

      await request
        .get(url + invalidPostid)
        .expect(StatusCodes.NOT_FOUND)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            message: `post with id ${invalidPostid} not found`,
          });
        });
    });
  });

  describe('DELETE /api/v1/post', () => {
    const url = '/api/v1/post';

    it('should return a 204 when deleting a post with authenticated user', async () => {
      const myPostId = 1;

      await authRequest({})
        .delete(url + '/' + myPostId)
        .expect(StatusCodes.NO_CONTENT);
    });

    it('should return a 403 error when deleting other users post', async () => {
      const post = await con.getRepository(Post).findOne({ where: { user: { name: 'ezequiel' } } });
      const otherUserPost = post?.id;

      await authRequest({})
        .delete(url + '/' + otherUserPost)
        .expect(StatusCodes.FORBIDDEN);
    });

    it('should fail when no auth token is provided', async () => {
      await request.delete(url + '/1').expect(StatusCodes.UNAUTHORIZED);
    });

    it('should fail when post id is out of range', async () => {
      const invalidPostid = 9999;

      await authRequest({})
        .delete(url + '/' + invalidPostid)
        .expect(StatusCodes.NOT_FOUND);
    });
  });
  describe('GET /api/v1/post', () => {
    const url = '/api/v1/post';

    it('should get a 200 response with a list of posts ', async () => {
      await authRequest({})
        .get(url)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.results)).toBe(true);
          expect(body.totalPosts).toBe(totalPosts);
        });
    });
  });
});
