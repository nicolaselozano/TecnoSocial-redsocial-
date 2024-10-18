import { User } from '@/features/user/userEntity';
import { ITRole } from '@/types/roles.enum';

type UserMock = Pick<User, 'name' | 'email' | 'role' | 'location' | 'job'> & {
  social_networks: { [k: string]: string };
};

export const USERS_MOCK: UserMock[] = [
  {
    email: 'martin@gmail.com',
    name: 'martin',
    job: 'Diseñador Freelance',
    role: ITRole.CLOUD_ARCHITECT,
    location: 'Buenos Aires',
    social_networks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    email: 'ezequiel@gmail.com',
    name: 'ezequiel',
    job: 'Consultora',
    role: ITRole.DATABASE_ADMINISTRATOR,
    location: 'Buenos Aires',
    social_networks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    email: 'email@gmail.com',
    name: 'username',
    job: 'Mercado libre',
    role: ITRole.BUSINESS_ANALYST,
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
];
