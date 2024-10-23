import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { User } from '../user/userEntity';
import { PostDelete, PostInsert, PostPut, PostSelect } from './post.types';
import { Post } from './postEntity';

class PostRepository {
  private repository = con.getRepository(Post);

  public async createPost(post: PostInsert): Promise<Post> {
    return await this.repository.save(post);
  }

  public async getAllPostsByUser(userId: User['id']): Promise<Post[]> {
    const posts = await this.repository.find({ where: { user: { id: userId } } });
    return posts;
  }

  public async getAllPostsCount({ search }: PaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      where: {
        title: Like(`%${search}%`),
      },
    });

    return count;
  }

  public async getAllPosts({ limit, skip, search }: PaginatedConfig) {
    const posts = await this.repository.find({
      relations: ['images', 'user'],
      take: limit,
      skip,
      where: {
        title: Like(`%${search}%`),
      },
    });

    return {
      posts,
    };
  }

  public async getPostById(id: PostSelect): Promise<Post> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['images', 'user', 'likes', 'comments', 'comments.user'],
    });

    if (!post) {
      throw new NotFoundError(`post with id ${id} not found`);
    }

    return post;
  }

  public async updatePost(id: PostSelect, post: PostPut): Promise<Post> {
    return (await this.repository.update({ id: id }, post)).raw;
  }

  public async deletePost(id: PostDelete): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const postRepository = new PostRepository();
