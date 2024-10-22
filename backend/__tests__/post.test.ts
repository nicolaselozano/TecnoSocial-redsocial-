import con from '@/config/database';
import { Post } from '@/features/post/postEntity';
import { MOCK_POSTS } from '@/utils/seed/mockups/posts.mock';
import { StatusCodes } from 'http-status-codes';
import { authRequest } from './helpers/authRequest';
import { request } from './jest.setup';

jest.mock('@/middlewares/Auth/utils/ManageToken');

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

  it('should get an 201 response', async () => {
    const post = MOCK_POSTS[0];

    await authRequest()
      .post(url)
      .send({
        title: post.title,
        content: post.content,
      })
      .expect(StatusCodes.CREATED)
      .expect(({ body }) => {
        expect(body.id).toBe(MOCK_POSTS.length + 2);
      });
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

  it('should get a 200 response with a single results', async () => {
    await request
      .get(url + '/1')
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body.id).toBe(1);
      });
  });

  it('should get a 404 response when looking for and invalid id', async () => {
    const invalidPostid = 9999;

    await request
      .get(url + '/' + invalidPostid)
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

    await authRequest()
      .delete(url + '/' + myPostId)
      .expect(StatusCodes.NO_CONTENT);
  });

  it('should return a 403 error when deleting other users post', async () => {
    const post = await con.getRepository(Post).findOne({ where: { user: { name: 'ezequiel' } } });
    const otherUserPost = post?.id;

    await authRequest()
      .delete(url + '/' + otherUserPost)
      .expect(StatusCodes.FORBIDDEN);
  });

  it('should fail when no auth token is provided', async () => {
    await request.delete(url + '/1').expect(StatusCodes.UNAUTHORIZED);
  });

  it('should fail when post id is out of range', async () => {
    const invalidPostid = 9999;

    await authRequest()
      .delete(url + '/' + invalidPostid)
      .expect(StatusCodes.NOT_FOUND);
  });
});
