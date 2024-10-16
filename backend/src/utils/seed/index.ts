import con from '@/config/database';
import envs from '@/config/envs';
import { Comment as CommentEntity } from '@/features/comment/commentEntity';
import { Connection as ConnectionEntity } from '@/features/connection/ConnectionEntity';
import { Image as ImageEntity } from '@/features/image/imageEntity';
import { Post as PostEntity } from '@/features/post/postEntity';
import { SocialNetworks as SocialNetworkEntity } from '@/features/social_networks/socialNetworksEntity';
import { User as UserEntity } from '@/features/user/userEntity';
import { MOCK_POSTS } from './mockups/posts.mock';
import { USERS_MOCK } from './mockups/users.mock';

async function seed() {
  if (!envs.SEED) {
    console.log(envs.SEED);
    throw new Error('This file must be used in seed mode');
  }

  try {
    if (!con.isInitialized) {
      await con.initialize();
    }

    const SocialNetwork = con.getRepository(SocialNetworkEntity);
    const Post = con.getRepository(PostEntity);
    const Image = con.getRepository(ImageEntity);
    const User = con.getRepository(UserEntity);
    const Comment = con.getRepository(CommentEntity);
    const Connection = con.getRepository(ConnectionEntity);

    // Seed users
    const seededUsers = await Promise.all(
      USERS_MOCK.map(async (user) => {
        const { email, name, password } = user;

        const newSocialsNetworks = SocialNetwork.create(user.social_networks);

        await SocialNetwork.save(newSocialsNetworks);

        const newUser = User.create({
          email,
          name,
          password,
          social_networks: newSocialsNetworks,
        });

        await User.save(newUser);
        return newUser;
      }),
    );

    const connections = [
      { follower: seededUsers[0], following: seededUsers[1] }, // User 0 follows User 1
      { follower: seededUsers[1], following: seededUsers[0] }, // User 1 follows User 0
      { follower: seededUsers[0], following: seededUsers[2] }, // User 0 follows User 2
    ];

    await Promise.all(
      connections.map(async (connection) => {
        const newConnection = Connection.create({
          follower: connection.follower,
          following: connection.following,
        });
        await Connection.save(newConnection);
      }),
    );

    const newSocialsNetworks = SocialNetwork.create({
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    });

    await SocialNetwork.save(newSocialsNetworks);

    const newUser = User.create({
      email: 'email@gmail.com',
      name: 'username',
      password: 'password',
      social_networks: newSocialsNetworks,
    });

    await User.save(newUser);

    // CREACION DE POSTS - COMENTARIOS - IMAGENES
    await Promise.all(
      MOCK_POSTS.map(async (post) => {
        const newPost = Post.create({
          content: post.content,
          title: post.title,
          user: newUser,
        });

        // Cuando lo guardo, se le asigna un ID automatico
        await Post.save(newPost);

        if (post.comments) {
          const comments = post.comments.map((com) =>
            Comment.create({
              content: com.content,
              post: newPost,
              user: seededUsers[0],
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
      }),
    );

    console.log('🌱 -- Seeding completed successfully.');
    process.exit();
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed();
