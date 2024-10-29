import { User } from '@/features/user/userEntity';
import { role, socialNetwork, user } from '.';
import { MOCK_USERS } from './mockups/users.mock';

export async function seedUsers(): Promise<User[]> {
  const users = await Promise.all(
    MOCK_USERS.map(async (u) => {
      const { email, name, job, location, social_networks } = u;

      const newSocialsNetworks = socialNetwork.create(social_networks);

      await socialNetwork.save(newSocialsNetworks);

      const userRole = await role.findOne({ where: { id: 1 } })!;

      const newUser = user.create({
        email,
        name,
        job,
        location,
        social_networks: newSocialsNetworks,
        roles: [userRole!],
      });

      await user.save(newUser);
      return newUser;
    }),
  );
  console.log('👥 -- Users seeded succesfully.');
  return users;
}
