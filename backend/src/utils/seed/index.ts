import con from '@/config/database';
import envs from '@/config/envs';
import { Comment as CommentEntity } from '@/features/comment/commentEntity';
import { Connection as ConnectionEntity } from '@/features/connection/ConnectionEntity';
import { Image as ImageEntity } from '@/features/image/imageEntity';
import { Like as LikeEntity } from '@/features/like/likeEntity';
import { Post as PostEntity } from '@/features/post/postEntity';
import { Project as ProjectEntity } from '@/features/project/projectEntity';
import { SocialNetworks as SocialNetworkEntity } from '@/features/social_networks/socialNetworksEntity';
import { User as UserEntity } from '@/features/user/userEntity';
import { UserProject as UserProjectEntity } from '@/features/userProject/userProjectEntity';
import { MOCK_POSTS } from './mockups/posts.mock';
import { PROJECTS_MOCK } from './mockups/projects.mock';
import { USERS_MOCK } from './mockups/users.mock';

const Project = con.getRepository(ProjectEntity);
const UserProject = con.getRepository(UserProjectEntity);
const Connection = con.getRepository(ConnectionEntity);
const Like = con.getRepository(LikeEntity);
const SocialNetwork = con.getRepository(SocialNetworkEntity);
const Post = con.getRepository(PostEntity);
const Image = con.getRepository(ImageEntity);
const Comment = con.getRepository(CommentEntity);

interface Options {
  exit?: boolean;
}

export async function seed({ exit = true }: Options) {
  try {
    if (!con.isInitialized) {
      await con.initialize();
    }

    const seededUsers = await seedUsers();

    const newUser = seededUsers.find((u) => u.name === 'username')!;
    const secondUser = seededUsers.find((u) => u.name === 'ezequiel')!;
    const thirdUser = seededUsers.find((u) => u.name === 'martin')!;

    const connections = [
      { follower: newUser, following: secondUser }, // User 0 follows User 1
      { follower: newUser, following: thirdUser }, // User 0 follows User 2
      { follower: secondUser, following: newUser }, // User 1 follows User 0
    ];

    await Promise.all(
      connections.map(async (connection) => {
        const newConnection = Connection.create({
          follower: connection.follower,
          followed: connection.following,
        });
        await Connection.save(newConnection);
      }),
    );

    const seededPosts = await seedPosts(newUser);

    // User Ezequiel has a single post
    const secondUserPost = Post.create({
      title: 'Post for user with 2',
      content: 'placeholder',
      user: seededUsers.find((u) => u.name === 'ezequiel'),
    });

    await Post.save(secondUserPost);

    // User with id 1 likes post with id 1
    const newLike = Like.create({
      post: seededPosts[0],
      user: newUser,
    });

    await Like.save(newLike);

    // Add projects
    await seedProjects(newUser);

    console.log('🌱 -- Seeding completed successfully.');

    if (exit) {
      process.exit();
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

async function seedUsers(): Promise<UserEntity[]> {
  const User = con.getRepository(UserEntity);
  const users = await Promise.all(
    USERS_MOCK.map(async (user) => {
      const { email, name, job, location, role, social_networks } = user;

      const newSocialsNetworks = SocialNetwork.create(social_networks);

      await SocialNetwork.save(newSocialsNetworks);

      const newUser = User.create({
        email,
        name,
        job,
        location,
        role,
        social_networks: newSocialsNetworks,
      });

      await User.save(newUser);
      return newUser;
    }),
  );
  console.log('👥 -- Users seeded succesfully.');
  return users;
}

async function seedPosts(user: UserEntity): Promise<PostEntity[]> {
  const posts = await Promise.all(
    MOCK_POSTS.map(async (post) => {
      const newPost = Post.create({
        content: post.content,
        title: post.title,
        user,
      });

      // Cuando lo guardo, se le asigna un ID automatico
      await Post.save(newPost);

      if (post.comments) {
        const comments = post.comments.map((com) =>
          Comment.create({
            content: com.content,
            post: newPost,
            user,
          }),
        );
        // Cuando lo guardo, se le asigna un ID automatico
        await Comment.save(comments);
      }

      if (post.images) {
        const images = post.images.map((image) =>
          Image.create({
            alt: image.alt,
            url: image.url,
            post_id: newPost,
          }),
        );

        await Image.save(images);
      }

      return newPost;
    }),
  );
  console.log('📝 -- Posts seeded succesfully.');
  return posts;
}

async function seedProjects(user: UserEntity): Promise<ProjectEntity[]> {
  const projects = await Promise.all(
    PROJECTS_MOCK.map(async (project) => {
      const newProject = Project.create({
        description: project.description,
        name: project.name,
        url: project.url,
      });

      await Project.save(newProject);

      const userProject = UserProject.create({
        project: newProject,
        role: 'Developer',
        user,
      });

      await UserProject.save(userProject);
      return newProject;
    }),
  );
  console.log('💻 -- Projects seeded succesfully.');
  return projects;
}

if (envs.SEED) {
  seed({
    exit: true,
  }).finally(() => {
    process.exit();
  });
}
