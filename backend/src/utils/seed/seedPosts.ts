import { Post } from '@/features/post/postEntity';
import { Technology } from '@/features/technology/technologyEntity';
import { comment, image, like, post, technology, user } from '.';
import { MOCK_POSTS } from './mockups/posts.mock';

export async function seedPosts(): Promise<Post[]> {
  const results = await Promise.all(
    MOCK_POSTS.map(async (p) => {
      const author = await user.findOne({
        where: {
          name: p.author,
        },
      });

      const newPost = post.create({
        content: p.content,
        title: p.title,
        user: author!,
      });

      // Add technologies
      if (p.techonologies) {
        const postTechnologies = await Promise.all(
          p.techonologies.map(
            async (tech) =>
              await technology.findOne({
                where: {
                  name: tech,
                },
              }),
          ),
        );

        newPost.technologies = postTechnologies as Technology[];
      }

      // Cuando lo guardo, se le asigna un ID automatico
      await post.save(newPost);

      // Add comments
      if (p.comments?.length) {
        const comments = await Promise.all(
          p.comments.map(async (com) => {
            const commentAuthor = await user.findOne({
              where: {
                name: com.user,
              },
            });

            return comment.create({
              content: 'Este es un comentario nuevo',
              post: newPost,
              user: commentAuthor!,
            });
          }),
        );
        // Cuando lo guardo, se le asigna un ID automatico
        await comment.save(comments);
      }

      // Add likes
      if (p.likes) {
        const likes = await Promise.all(
          p.likes.map(async (l) => {
            const likeAuthor = await user.findOne({
              where: {
                name: l,
              },
            });

            return like.create({
              post: newPost,
              user: likeAuthor!,
            });
          }),
        );
        // Cuando lo guardo, se le asigna un ID automatico
        await comment.save(likes);
      }

      // Add images
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
