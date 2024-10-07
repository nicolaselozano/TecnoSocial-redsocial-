import con from "../config/database";
import envs from "../config/envs";
import { Post as PostEntity } from "../features/post/postEntity";
import { User as UserEntity } from "../features/user/emtities/userEntity";

if (!envs.SEED) {
  console.log(envs.SEED);
  throw new Error("This file must be used in seed mode");
}

(async () => {
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

    const newPost = Post.create({
      content: "This is a made up post",
      title: "My first post ever",
      user_id: newUser,
    });

    await Post.insert(newPost);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
})();
