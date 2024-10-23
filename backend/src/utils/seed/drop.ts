import con from '@/config/database';
import envs from '@/config/envs';
import { upOne } from 'docker-compose';

export async function waitForDBConnection() {
  let retries = 5;
  while (retries) {
    try {
      if (!con.isInitialized) {
        await con.initialize();
      }
      console.log('✅ Database connection established');
      return;
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log('Error trying to connect to the DB');
      retries -= 1;
      console.log(`⏳ Retrying database connection (${5 - retries}/5)`);
      await new Promise((res) => setTimeout(res, 500));
    }
  }
  throw new Error('Failed to connect to the database');
}

export async function dropDB() {
  try {
    await waitForDBConnection();
    await con.dropDatabase();
    await con.destroy();
    console.log('🔨 -- DB Dropped successfully');
  } catch (error) {
    console.log('Error while dropping DB', error);
  }
}

if (envs.SEED) {
  upOne('tecno-db').then(() => {
    console.log('🐋 -- Docker container inicializado');
    dropDB().finally(() => {
      process.exit();
    });
  });
}
