export const TECHNOLOGIES_MOCK = [
  'Nextjs',
  'Express',
  'Nestjs',
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'HTML',
  'CSS',
  'Javascript',
  'Typescript',
  'Java',
  'Python',
  'Go',
  'Rust',
  'C',
  'C++',
  'C#',
] as const;

export type TechnologyMock = (typeof TECHNOLOGIES_MOCK)[number];
