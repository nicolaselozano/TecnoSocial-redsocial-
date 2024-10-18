import { Request } from 'express';

export function getUserPutData(body: Request['body']) {
  const { name, username, role, avatar, location, job } = body;
  return {
    name,
    username,
    role,
    avatar,
    location,
    job,
  };
}
