import { StatusCodes } from 'http-status-codes';
import { request } from './jest.setup';

describe('GET /api/health', () => {
  const url = '/api/health';

  it('should be healthy', async () => {
    await request.get(url).expect(StatusCodes.OK);
  });
});
