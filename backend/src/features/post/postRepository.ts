import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { Image } from '../image/imageEntity';
import { User } from '../user/userEntity';
import { PostDelete, PostInsert, PostPut, PostSelect } from './post.types';
import { Post } from './postEntity';

class PostRepository {
  private repository = con.getRepository(Post);
  private imageRepository = con.getRepository(Image);

  public async createPost(postData: PostInsert, imglist: [string]): Promise<Post> {
    // Crear el post sin imágenes y obtener la instancia de la base de datos
    const post = this.repository.create({
      title: postData.title,
      content: postData.content,
      technologies: postData.technologies,
      user: postData.user,
    });

    const savedPost = await this.repository.save(post);
    console.log(postData);
    const images = await Promise.all(
      imglist.map((imageUrl) => {
        if (!imageUrl) {
          throw new Error("El campo 'url' es obligatorio para cada imagen.");
        }
        return this.imageRepository.create({
          url: imageUrl,
          alt: '',
          post: savedPost,
        });
      }),
    );

    await this.imageRepository.save(images);

    savedPost.images = images;
    return savedPost;
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

  public async getPostCountByUser(userid: User['id']): Promise<number> {
    const count = await this.repository.count({
      where: {
        user: {
          id: userid,
        },
      },
      relations: ['user'],
    });

    return count;
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
