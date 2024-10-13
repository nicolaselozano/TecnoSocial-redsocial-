import { Request, Response } from 'express';
import { Post } from './postEntity';
import { postRepository } from './postRepository';
import { GetPostsConfig } from './postInterface';

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
    const { limit, skip, search } = req.query;

    const config: GetPostsConfig = {
      limit: limit ? Number(limit) : 5,
      skip: skip ? Number(skip) : 0,
      search: search ? String(search) : '',
    };

    const posts = await postRepository.getAllPosts(config);
    res.json({
      results: posts,
      info: {
        skip: config.skip,
        results: posts.length,
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
