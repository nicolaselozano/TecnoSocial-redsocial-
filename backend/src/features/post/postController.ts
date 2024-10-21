import { BadRequestError } from '@/utils/errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { commentRepository } from '../comment/commentRepository';
import { likeRepository } from '../like/likeRepository';
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
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getAllPosts(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = req.query.search ? String(req.query.search) : '';

    const totalPosts = await postRepository.getAllPostsCount({ limit, search });

    const totalPages = Math.ceil(totalPosts / limit!);

    if (page > totalPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const { posts } = await postRepository.getAllPosts({
      skip: (page - 1) * limit,
      limit,
      search,
    });

    // TODO - ver como obtenemos el id del usuario realizando la peticion
    //        a lo mejor se usa el middleware que checkea el token.
    const userid = 1;

    const postWithLikedProperty = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        isLike: await likeRepository.userHasLikedPost({ postid: post.id, userid }),
        likeCount: await likeRepository.countLikes(post.id),
        commentsCount: await commentRepository.countComments(post.id),
      })),
    );

    res.json({
      results: postWithLikedProperty,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  }

  public async getAllPostsByUser(req: Request, res: Response): Promise<void> {
    const { userid } = req.params;
    const results = await postRepository.getAllPostsByUser(Number(userid));
    res.json(results);
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
