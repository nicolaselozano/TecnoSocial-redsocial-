import 'tsconfig-paths/register';

import con from '@/config/database';

export default async () => {
  if (con.isInitialized) {
    await con.destroy();
  }
};
