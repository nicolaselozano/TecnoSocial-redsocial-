import 'tsconfig-paths/register';

import con from '@/config/database';
import { down } from 'docker-compose';
import isCI from 'is-ci';

export default async () => {
  if (isCI) {
    await down({
      log: true,
    });
  }
  await con.destroy();
};
