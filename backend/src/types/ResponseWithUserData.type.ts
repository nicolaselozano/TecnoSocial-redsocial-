import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';
import { Response } from 'express';

export interface ResponseWithUserData extends Response {
  locals: {
    userData?: UserDataToken;
  };
}
