/**
 * Seed data structure:
 * https://app.diagrams.net/#G1gEjioZKXbyftsDmQMpOvVXhCd3iMHkkX#%7B%22pageId%22%3A%22_IJyscykdOZtyHfO5Qzm%22%7D
 *
 */

import con from '@/config/database';
import envs from '@/config/envs';
import { Comment } from '@/features/comment/commentEntity';
import { Connection } from '@/features/connection/ConnectionEntity';
import { Image } from '@/features/image/imageEntity';
import { Like } from '@/features/like/likeEntity';
import { Notification } from '@/features/notification/notificationEntity';
import { Post } from '@/features/post/postEntity';
import { Project } from '@/features/project/projectEntity';
import { Role } from '@/features/role/roleEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
import { Technology } from '@/features/technology/technologyEntity';
import { User } from '@/features/user/userEntity';
import { UserProject } from '@/features/userProject/userProjectEntity';
import { MOCK_ROLES } from './mockups/roles.mock';
import { seedConnections } from './seedConnections';
import { seedPosts } from './seedPosts';
import { seedProjects } from './seedProjects';
import { seedUsers } from './seedUsers';

export const project = con.getRepository(Project);
export const userProject = con.getRepository(UserProject);
export const connection = con.getRepository(Connection);
export const like = con.getRepository(Like);
export const socialNetwork = con.getRepository(SocialNetworks);
export const post = con.getRepository(Post);
export const image = con.getRepository(Image);
export const comment = con.getRepository(Comment);
export const notification = con.getRepository(Notification);
export const user = con.getRepository(User);
export const role = con.getRepository(Role);
export const technology = con.getRepository(Technology);

interface Options {
  exit?: boolean;
}

export async function seed({ exit = true }: Options) {
  try {
    if (!con.isInitialized) {
      await con.initialize();
    }

    await seedRoles();
    await seedUsers();
    await seedConnections();
    await seedPosts();
    await seedProjects();

    console.log('🌱 -- Seeding completed successfully.');

    if (exit) {
      process.exit();
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

async function seedRoles() {
  const roles = await Promise.all(
    MOCK_ROLES.map(async (r) => {
      const newRole = role.create({
        name: r,
      });
      role.save(newRole);
      return newRole;
    }),
  );
  return roles;
}

if (envs.SEED) {
  seed({ exit: true }).finally(() => {
    process.exit();
  });
}
