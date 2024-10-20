import 'tsconfig-paths/register';

import con from '@/config/database';

export default async () => {
  await con.destroy();
};
