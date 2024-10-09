import con from '@/config/database';
import envs from '@/config/envs';
import { Image as ImageEntity } from '@/features/image/imageEntity';
import { Post as PostEntity } from '@/features/post/postEntity';
import { SocialNetworks as SocialNetworkEntity } from '@/features/social_networks/socialNetworksEntity';
import { User as UserEntity } from '@/features/user/userEntity';
import { MOCK_POSTS } from './mockups/posts.mock';

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

    const newSocialsNetworks = SocialNetwork.create({
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    });

    await SocialNetwork.insert(newSocialsNetworks);

    const newUser = User.create({
      email: 'email@gmail.com',
      name: 'username',
      password: 'password',
      social_networks: newSocialsNetworks,
    });

    await User.insert(newUser);

    const posts = await Promise.all(
      MOCK_POSTS.map(async (post) => {
        const newPost = Post.create({
          content: post.content,
          title: post.title,
          user: newUser,
        });

        await Post.save(newPost);

        const images = post.images.map((image) =>
          Image.create({
            alt: image.alt,
            url: image.url,
            post_id: newPost,
          }),
        );

        await Image.save(images);

        newPost.images = images;

        return newPost;
      }),
    );

    await Post.save(posts);

    console.log('🌱 -- Seeding completed successfully.');
    process.exit();
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed();
