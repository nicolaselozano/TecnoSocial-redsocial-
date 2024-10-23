import { app } from '@/app';
import { ManageToken } from '@/middlewares/Auth/utils/ManageToken';
import supertest from 'supertest';

jest.mock('@/middlewares/Auth/utils/ManageToken');

export function authRequest() {
  (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
    custom_email_claim: 'email@gmail.com',
    custom_name_claim: 'test-user',
    sub: '1',
  });

  const agent = supertest.agent(app);

  return agent.set('Cookie', ['token=mytoken']);
}
