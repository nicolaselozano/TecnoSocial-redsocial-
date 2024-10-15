import { BadRequestError } from '@/utils/errors';
import { Request, Response } from 'express';
import { Post } from './postEntity';
import { postRepository } from './postRepository';

class PostController {
  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, content, user } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    const response = await postRepository.createPost(post);
    res.json(response);
  }

  public async getAllPosts(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = req.query.search ? String(req.query.search) : '';

    const { posts, totalPages } = await postRepository.getAllPosts({
      skip: (page - 1) * limit,
      limit,
      search,
    });

    if (page > totalPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    res.json({
      results: posts,
      info: {
        results: posts.length,
        currentPage: page,
        totalPages,
      },
    });
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const post = await postRepository.getPostById(Number(id));
    res.json(post);
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, content, user } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    const response = await postRepository.updatePost(Number(id), post);
    res.json(response);
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await postRepository.deletePost(Number(id));
    res.json(response);
  }
}

export const postController = new PostController();
