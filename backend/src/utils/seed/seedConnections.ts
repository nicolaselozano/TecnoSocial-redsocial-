import { connection, user } from '.';
import { CONNECTIONS_MOCK } from './mockups/connections.mock';

export async function seedConnections() {
  await Promise.all(
    CONNECTIONS_MOCK.map(async (con) => {
      const followerUser = await user.findOne({
        where: {
          name: con.follower,
        },
      });

      const userConnections = await Promise.all(
        con.followed.map(async (followed) => {
          const followedUser = await user.findOne({
            where: {
              name: followed,
            },
          });

          return connection.create({
            follower: followerUser!,
            followed: followedUser!,
          });
        }),
      );
      await connection.save(userConnections);
    }),
  );
}
