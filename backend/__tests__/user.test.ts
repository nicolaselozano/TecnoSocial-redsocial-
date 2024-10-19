import { request } from './app.test';

describe('/user endpoint', () => {
  const url = '/api/v1/user';

  it('should get all users', async () => {
    await request
      .get(url)
      .expect(200)
      .expect(({ body }) => {
        expect(body.currentPage).toBe(1);
        expect(body.totalPages).toBe(1);
        expect(body.totalUsers).toBe(3);
      });
  });

  it('should get one user using query params', async () => {
    await request
      .get(url + '?limit=1')
      .expect(200)
      .expect(({ body }) => {
        expect(body.users.length).toBe(1);
      });
  });

  it('should fail to get user with invalid id', async () => {
    await request
      .get(url + '/4')
      .expect(404)
      .expect(({ body }) => {
        expect(body.message).toMatchInlineSnapshot(`"user with id 4 not found"`);
      });
  });
});
