export const MOCK_USERS = [
  {
    email: 'martin@gmail.com',
    name: 'martin',
    job: 'Diseñador Freelance',
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
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'sofia@gmail.com',
    name: 'sofia',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'marcos@gmail.com',
    name: 'marcos',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'fabricio@gmail.com',
    name: 'fabricio',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'melina@gmail.com',
    name: 'melina',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'felipe@gmail.com',
    name: 'felipe',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
  {
    email: 'santiago@gmail.com',
    name: 'santiago',
    job: 'Mercado libre',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
] as const;

export type MockUser = (typeof MOCK_USERS)[number]['name'];
