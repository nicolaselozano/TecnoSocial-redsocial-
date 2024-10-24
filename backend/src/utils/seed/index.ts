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
import { User } from '@/features/user/userEntity';
import { UserProject } from '@/features/userProject/userProjectEntity';
import { FIRST_USER_POSTS, PostMock, SECOND_USER_POSTS } from './mockups/posts.mock';
import { PROJECTS_MOCK } from './mockups/projects.mock';
import { MOCK_ROLES } from './mockups/roles.mock';
import { USERS_MOCK } from './mockups/users.mock';

const project = con.getRepository(Project);
const userProject = con.getRepository(UserProject);
const connection = con.getRepository(Connection);
const like = con.getRepository(Like);
const socialNetwork = con.getRepository(SocialNetworks);
const post = con.getRepository(Post);
const image = con.getRepository(Image);
const comment = con.getRepository(Comment);
const notification = con.getRepository(Notification);
const user = con.getRepository(User);
const role = con.getRepository(Role);

interface Options {
  exit?: boolean;
}

export async function seed({ exit = true }: Options) {
  try {
    if (!con.isInitialized) {
      await con.initialize();
    }
    const seededRoles = await seedRoles();
    const seededUsers = await seedUsers(seededRoles);

    const newUser = seededUsers.find((u) => u.name === 'username')!;
    const secondUser = seededUsers.find((u) => u.name === 'ezequiel')!;
    const thirdUser = seededUsers.find((u) => u.name === 'martin')!;

    const connections = [
      { follower: newUser, following: secondUser }, // User 0 follows User 1
      { follower: newUser, following: thirdUser }, // User 0 follows User 2
      { follower: secondUser, following: newUser }, // User 1 follows User 0
    ];

    await Promise.all(
      connections.map(async (con) => {
        const newConnection = connection.create({
          follower: con.follower,
          followed: con.following,
        });
        await connection.save(newConnection);
      }),
    );

    const seededPosts = await seedPosts(newUser, FIRST_USER_POSTS);
    const secondUserPost = await seedPosts(secondUser, SECOND_USER_POSTS);

    // User with id 1 likes post with id 1
    const newLike = like.create({
      post: seededPosts[0],
      user: newUser,
    });

    await like.save(newLike);

    // Add projects
    await seedProjects(newUser, [secondUser, thirdUser]);

    // username tiene 2 notificaciones, de las cuales solo 1 se muestra
    const newNotification = notification.create({
      title: 'Nueva noti',
      description: 'esta es una nueva notificacion',
      post: seededPosts[0],
      user: newUser,
    });

    await notification.save(newNotification);

    const secondNotification = notification.create({
      title: 'Nueva noti',
      description: 'esta es una nueva notificacion',
      post: seededPosts[0],
      user: newUser,
      soft_delete: true,
    });

    await notification.save(secondNotification);

    // ezequiel va a tener 2 notificaciones
    const ezequielNotificaion1 = notification.create({
      title: 'Nueva noti',
      description: 'esta es una nueva notificacion',
      post: secondUserPost[0],
      user: newUser,
    });

    await notification.save(ezequielNotificaion1);

    const ezequielNotificaion2 = notification.create({
      title: 'Nueva noti',
      description: 'esta es una nueva notificacion',
      post: secondUserPost[0],
      user: newUser,
    });

    await notification.save(ezequielNotificaion2);

    console.log('🌱 -- Seeding completed successfully.');

    if (exit) {
      process.exit();
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

async function seedUsers(roles?: Role[]): Promise<User[]> {
  const users = await Promise.all(
    USERS_MOCK.map(async (u) => {
      const { email, name, job, location, social_networks } = u;

      const newSocialsNetworks = socialNetwork.create(social_networks);

      await socialNetwork.save(newSocialsNetworks);

      const newUser = user.create({
        email,
        name,
        job,
        location,
        social_networks: newSocialsNetworks,
        roles: [roles![0], roles![1]],
      });

      await user.save(newUser);
      return newUser;
    }),
  );
  console.log('👥 -- Users seeded succesfully.');
  return users;
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

async function seedPosts(user: User, posts: PostMock[]): Promise<Post[]> {
  const results = await Promise.all(
    posts.map(async (p) => {
      const newPost = post.create({
        content: p.content,
        title: p.title,
        user,
      });

      // Cuando lo guardo, se le asigna un ID automatico
      await post.save(newPost);

      if (p.comments) {
        const comments = p.comments.map((com) =>
          comment.create({
            content: com.content,
            post: newPost,
            user,
          }),
        );
        // Cuando lo guardo, se le asigna un ID automatico
        await comment.save(comments);
      }

      if (p.images) {
        const images = p.images.map((img) =>
          image.create({
            alt: img.alt,
            url: img.url,
            post_id: newPost,
          }),
        );

        await image.save(images);
      }

      return newPost;
    }),
  );
  console.log('📝 -- Posts seeded succesfully.');
  return results;
}

async function seedProjects(user: User, likers: User[]): Promise<Project[]> {
  const projects = await Promise.all(
    PROJECTS_MOCK.map(async (pro) => {
      const newProject = project.create({
        description: pro.description,
        name: pro.name,
        url: pro.url,
        liked_users: likers,
      });

      await project.save(newProject);

      const newUserProject = userProject.create({
        project: newProject,
        role: 'Developer',
        user,
      });

      await userProject.save(newUserProject);
      return newProject;
    }),
  );
  console.log('💻 -- Projects seeded succesfully.');
  return projects;
}

if (envs.SEED) {
  seed({ exit: true }).finally(() => {
    process.exit();
  });
}
