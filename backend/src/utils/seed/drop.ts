import con from '@/config/database';

async function dropDB() {
  try {
    if (!con.isInitialized) {
      await con.initialize();
    }
    await con.dropDatabase();
    await con.destroy();
    console.log('🔨 -- DB Dropped succesfully');
  } catch (error) {
    console.log('Error while dropping DB');
  }
}

dropDB();
