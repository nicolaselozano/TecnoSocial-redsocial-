import { Project } from '@/features/project/projectEntity';

type ProjectMock = Pick<Project, 'description' | 'name' | 'url'>;

export const PROJECTS_MOCK: ProjectMock[] = [
  {
    name: 'e-commerce',
    description: 'Ecommerce destinado a productos hogareños',
    url: 'https://proyecto-1.com',
  },
  {
    name: 'red social',
    description: 'Red social especializada en comida',
    url: 'https://proyecto-2.com',
  },
];
