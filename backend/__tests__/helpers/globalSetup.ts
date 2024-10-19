import { upAll } from 'docker-compose';

export default async () => {
  await upAll({
    log: true,
  });
};
