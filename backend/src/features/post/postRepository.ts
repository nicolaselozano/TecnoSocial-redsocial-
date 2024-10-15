import con from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { User } from '../user/userEntity';
import { Post } from './postEntity';
import { GetPostsConfig } from './postInterface';

class PostRepository {
  private repository = con.getRepository(Post);

  public async createPost(user: Post): Promise<Post> {
    return await this.repository.save(user);
  }

  public async getAllPostsByUser(userId: User['id']): Promise<Post[]> {
    console.log(userId);
    const posts = await this.repository.find({ where: { user: { id: userId } } });
    return posts;
  }

  public async getAllPosts({ limit, skip, search }: GetPostsConfig) {
    console.log({ search });

    const totalPosts = await this.repository.count({
      where: {
        title: Like(`%${search}%`),
      },
    });

    const totalPages = Math.ceil(totalPosts / limit!);

    if (totalPosts === 0) {
      return { posts: [], totalPages: 0 };
    }

    const posts = await this.repository.find({
      relations: ['images', 'user'],
      take: limit,
      skip,
      where: {
        title: Like(`%${search}%`),
      },
    });

    return {
      totalPages,
      posts,
    };
  }

  public async getPostById(id: Post['id']): Promise<Post> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['images', 'user', 'likes', 'comments'],
    });

    if (!post) {
      throw new NotFoundError(`Post with id ${id} not found`);
    }

    return post;
  }

  public async updatePost(id: Post['id'], post: Post): Promise<Post> {
    return (await this.repository.update({ id: id }, post)).raw;
  }

  public async deletePost(id: Post['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const postRepository = new PostRepository();
