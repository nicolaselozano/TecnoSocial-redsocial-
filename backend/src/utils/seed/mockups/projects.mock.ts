import { Project } from '@/features/project/projectEntity';
import { MockRole } from './roles.mock';
import { MockUser } from './users.mock';

type ProjectMock = Pick<Project, 'description' | 'name' | 'url'> & {
  participants: { name: MockUser; role: MockRole }[];
  likes: MockUser[];
};

export const PROJECTS_MOCK: ProjectMock[] = [
  {
    name: 'e-commerce',
    description: 'Ecommerce destinado a productos hogareños',
    url: 'https://proyecto-1.com',
    participants: [
      {
        name: 'username',
        role: 'Backend',
      },
      {
        name: 'ezequiel',
        role: 'AI Engineer',
      },
      {
        name: 'martin',
        role: 'Database Administrator',
      },
      {
        name: 'sofia',
        role: 'DevOps Engineer',
      },
    ],
    likes: ['username'],
  },
  {
    name: 'red social',
    description: 'Red social especializada en comida',
    url: 'https://proyecto-2.com',
    participants: [
      {
        name: 'martin',
        role: 'Frontend',
      },
      {
        name: 'sofia',
        role: 'DevOps Engineer',
      },
    ],
    likes: [],
  },
  {
    name: 'red social',
    description: 'Red social especializada en comida',
    url: 'https://proyecto-2.com',
    participants: [
      {
        name: 'felipe',
        role: 'Mobile Developer',
      },
      {
        name: 'santiago',
        role: 'Project Manager',
      },
    ],
    likes: [],
  },
];
