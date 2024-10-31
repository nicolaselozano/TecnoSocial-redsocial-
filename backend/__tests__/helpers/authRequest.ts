import { app } from '@/app';
import { ManageToken } from '@/middlewares/Auth/utils/ManageToken';
import supertest from 'supertest';

jest.mock('@/middlewares/Auth/utils/ManageToken');

type AuthMockCredentials = {
  email?: string;
  name?: string;
  sub?: string;
};

export function authRequest(mockCredentials: AuthMockCredentials) {
  (ManageToken.ValidateToken as jest.Mock).mockResolvedValue({
    custom_email_claim: mockCredentials.email ?? 'email@gmail.com',
    custom_name_claim: mockCredentials.name ?? 'test-user',
    sub: mockCredentials.sub ?? '1',
  });

  const agent = supertest.agent(app);

  return agent.set('Cookie', ['token=mytoken']);
}
