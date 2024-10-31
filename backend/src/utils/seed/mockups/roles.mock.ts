export const MOCK_ROLES = [
  'Frontend',
  'Backend',
  'Mobile Developer',
  'UX',
  'UI',
  'Tester',
  'DevOps Engineer',
  'AI Engineer',
  'Cybersecurity Analyst',
  'Database Administrator',
  'Project Manager',
  'Scrum Master',
  'Tech Lead',
] as const;

export type MockRole = (typeof MOCK_ROLES)[number];
