import 'tsconfig-paths/register';

import con from '@/config/database';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { upOne } from 'docker-compose';

export default async () => {
  try {
    await upOne('tecno-db-test', {
      log: true,
    });

    if (!con.isInitialized) {
      await con.initialize();
    }

    await dropDB();
    await seed({
      exit: false,
    });
  } catch (error) {
    console.error(error);
  }
};
