import { MockUser } from './users.mock';

type ConnectionMock = {
  follower: MockUser;
  followed: MockUser[];
};

export const CONNECTIONS_MOCK: ConnectionMock[] = [
  {
    follower: 'username',
    followed: ['ezequiel', 'martin', 'felipe', 'sofia', 'marcos'],
  },
  {
    follower: 'fabricio',
    followed: ['username'],
  },
  {
    follower: 'melina',
    followed: ['username'],
  },
  {
    follower: 'felipe',
    followed: ['username'],
  },
  {
    follower: 'santiago',
    followed: ['username'],
  },
];
