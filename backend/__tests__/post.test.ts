import con from '@/config/database';
import { MOCK_POSTS } from '@/utils/seed/mockups/posts.mock';
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
        expect(body.totalPosts).toBe(MOCK_POSTS.length);
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
    const invalidPostid = MOCK_POSTS.length + 1;

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

  // TODO - Figure out a way to bypass 0auth token validation
  it.skip('should return a 204 when deleting a post with authenticated user', async () => {
    const myPostId = 1;
    await request.delete(url + '/' + myPostId).expect(StatusCodes.NO_CONTENT);
  });

  // TODO - Figure out a way to bypass 0auth token validation
  it.skip('should return a 401 error when deleting other users post', async () => {
    const otherUserPost = 1;
    await request.delete(url + '/' + otherUserPost).expect(StatusCodes.UNAUTHORIZED);
  });

  it('should fail when no auth token is provided', async () => {
    await request.delete(url + '/1').expect(StatusCodes.UNAUTHORIZED);
  });

  it('should fail when post id is out of range', async () => {
    const invalidPostid = MOCK_POSTS.length + 1;
    await request.delete(url + '/' + invalidPostid).expect(StatusCodes.NOT_FOUND);
  });
});
