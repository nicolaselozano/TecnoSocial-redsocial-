import con from '@/config/database';
import envs from '@/config/envs';
import { Comment as CommentEntity } from '@/features/comment/commentEntity';
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
