import 'tsconfig-paths/register';

import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { upOne } from 'docker-compose';
import isCI from 'is-ci';

export default async () => {
  try {
    // Nuestra configuracion de la github actions
    // Inicia el servicio de mysql automaticamente
    // Por lo que no hace falta iniciar el contenedor de docker
    console.log('🐋 -- Starting Docker container for testing...');
    if (!isCI) {
      await upOne('tecno-db-test', {
        log: true,
      });
    }

    await dropDB();
    await seed({
      exit: false,
    });
  } catch (error) {
    console.error(error);
  }
};
