import { app } from '@/app';
import con from '@/config/database';
import { Post } from '@/features/post/postEntity';
import { ManageToken } from '@/middlewares/Auth/utils/ManageToken';
import { MOCK_POSTS } from '@/utils/seed/mockups/posts.mock';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
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
    (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
      custom_email_claim: 'email@gmail.com',
      custom_name_claim: 'test-user',
      sub: '1',
    });
    const agent = supertest.agent(app);
    const post = MOCK_POSTS[0];

    await agent
      .post(url)
      .set('Cookie', ['token=mytoken'])
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
    (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
      custom_email_claim: 'email@gmail.com',
      custom_name_claim: 'test-user',
      sub: '1',
    });

    const agent = supertest.agent(app);
    const myPostId = 1;
    await agent
      .delete(url + '/' + myPostId)
      .set('Cookie', ['token=mytoken'])
      .expect(StatusCodes.NO_CONTENT);
  });

  it('should return a 403 error when deleting other users post', async () => {
    (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
      custom_email_claim: 'email@gmail.com',
      custom_name_claim: 'test-user',
      sub: '1',
    });

    const agent = supertest.agent(app);

    const post = await con.getRepository(Post).findOne({ where: { user: { name: 'ezequiel' } } });
    const otherUserPost = post?.id;

    await agent
      .delete(url + '/' + otherUserPost)
      .set('Cookie', ['token=mytoken'])
      .expect(StatusCodes.FORBIDDEN);
  });

  it('should fail when no auth token is provided', async () => {
    await request.delete(url + '/1').expect(StatusCodes.UNAUTHORIZED);
  });

  it('should fail when post id is out of range', async () => {
    (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
      custom_email_claim: 'email@gmail.com',
      custom_name_claim: 'test-user',
      sub: '1',
    });

    const agent = supertest.agent(app);

    const invalidPostid = 9999;
    await agent
      .delete(url + '/' + invalidPostid)
      .set('Cookie', ['token=mytoken'])
      .expect(StatusCodes.NOT_FOUND);
  });
});
