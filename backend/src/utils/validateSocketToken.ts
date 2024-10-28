import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from './errors';
import { ManageToken } from '@/middlewares/Auth/utils/ManageToken';

/* eslint-disable prettier/prettier */
export const validateSocketToken = async (
  token: string,
): Promise<{ authId: string; authName: string; email: string }> => {
  const validateToken: JwtPayload | null = await ManageToken.ValidateToken(token);
  if (!validateToken) {
    throw new UnauthorizedError('El token no es válido');
  }

  const authId = validateToken['sub'];
  const authName = validateToken['custom_name_claim'];
  const email = validateToken['custom_email_claim'];
  if (!authId || !authName || !email) {
    throw new UnauthorizedError('El token no es valido');
  }
  return { authId, authName, email };
};
