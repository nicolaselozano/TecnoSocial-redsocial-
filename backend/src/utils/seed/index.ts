import con from "@/config/database";
import envs from "@/config/envs";
import { Post as PostEntity } from "@/features/post/postEntity";
import { User as UserEntity } from "@/features/user/userEntity";
import { MOCK_POSTS } from "./mockups/posts.mock";

async function seed() {
  if (!envs.SEED) {
    console.log(envs.SEED);
    throw new Error("This file must be used in seed mode");
  }

  try {
    if (!con.isInitialized) {
      await con.initialize();
    }

    const Post = con.getRepository(PostEntity);
    const User = con.getRepository(UserEntity);

    const newUser = User.create({
      email: "email@gmail.com",
      name: "username",
      password: "password",
    });

    await User.insert(newUser);

    const posts = await Promise.all(
      MOCK_POSTS.map(async (post) => {
        const newPost = Post.create({
          content: post.content,
          title: post.title,
          user_id: newUser,
        });
        return newPost;
      })
    );

    await Post.insert(posts);

    console.log("🌱 -- Seeding completed successfully.");
    process.exit();
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
