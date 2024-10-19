import { upOne } from 'docker-compose';

export default async () => {
  await upOne('tecno-db-test', {
    log: true,
  });
};
