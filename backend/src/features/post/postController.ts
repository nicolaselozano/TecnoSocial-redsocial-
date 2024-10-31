import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { commentRepository } from '../comment/commentRepository';
import { connectionRepository } from '../connection/ConnectionRepository';
import { likeRepository } from '../like/likeRepository';
import { userRepository } from '../user/userRepository';
import { Post } from './postEntity';
import { postRepository } from './postRepository';

class PostController {
  public async createPost(req: Request, res: ResponseWithUserData): Promise<void> {
    const { title, content, images, technologies } = req.body;
    const { email } = res.locals.userData!;

    const user = await userRepository.getUserByEmail(email);

    const response = await postRepository.createPost({ content, technologies, title, user }, images);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getAllPostsAuthenticated(req: Request, res: ResponseWithUserData): Promise<void> {
    const { limit, page, search } = getPaginatedParams(req);
    const { email } = res.locals.userData!;

    const totalPosts = await postRepository.getAllPostsCount({ search });

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
    const clientUser = await userRepository.getUserByEmail(email);

    const postWithLikedProperty = await Promise.all(
      posts.map(async (post) => {
        const userWithRoles = await userRepository.getUserWithRoles(post.user.id);

        return {
          ...post,
          user: {
            ...userWithRoles,
            isFollower: await connectionRepository.isFollower(post.user.id, clientUser.id),
          },
          isLike: await likeRepository.userHasLikedPost({ postid: post.id, userid: clientUser.id }),
          likeCount: await likeRepository.countLikes(post.id),
          commentsCount: await commentRepository.countComments(post.id),
        };
      }),
    );

    res.json({
      results: postWithLikedProperty,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  }

  public async getAllPostsByUser(req: Request, res: Response): Promise<void> {
    const { limit, page } = getPaginatedParams(req);
    const { userid } = req.params;

    const totalPosts = await postRepository.getPostCountByUser(Number(userid));

    if (totalPosts === 0) {
      res.json({ results: [], totalPages: 0, currentPage: 0, totalPosts: 0 });
      return;
    }

    const totalPages = Math.ceil(totalPosts / limit!);

    if (page > totalPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const postsByUser = await postRepository.getAllPostsByUser({
      skip: (page - 1) * limit,
      userid: Number(userid),
      limit,
    });

    const postsWithMoreInfo = await Promise.all(
      postsByUser.map(async (post) => ({
        ...post,
        likesCount: await likeRepository.countLikes(post.id),
        commentsCount: await commentRepository.countComments(post.id),
      })),
    );

    res.json({ results: postsWithMoreInfo, totalPages, currentPage: page, totalPosts });
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

  public async deletePost(req: Request, res: ResponseWithUserData): Promise<void> {
    const { id } = req.params;
    const { email } = res.locals.userData!;

    // Check post exists
    const post = await postRepository.getPostById(Number(id));

    if (post.user.email !== email) {
      throw new ForbiddenError('forbidden operation');
    }

    const response = await postRepository.deletePost(Number(id));
    res.status(StatusCodes.NO_CONTENT).json(response);
  }

  public async followedUsersPostsById(req: Request, res: Response): Promise<void> {
    const { search, page, limit } = getPaginatedParams(req);
    const { id } = req.params;

    const followed = await connectionRepository.getAllFollowed({
      search,
      userid: Number(id),
      skip: (page - 1) * limit,
      limit,
    });
    const posts = await Promise.all(
      followed.map(async (user) => {
        return await postRepository.getPostById(user.id);
      }),
    );
    const flatPosts = posts.flat();
    if (flatPosts.length === 0) {
      throw new NotFoundError('error al paginar');
    }
    res.json({
      results: flatPosts,
      currentPage: page,
      totalPages: Math.ceil(followed.length / limit),
    });
  }
  public async getAllPost(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = req.query.search ? String(req.query.search) : '';

    const totalPosts = await postRepository.getAllPostsCount({ limit, search });
    const totalPages = Math.ceil(totalPosts / limit);

    if (page > totalPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const { posts } = await postRepository.getAllPosts({
      skip: (page - 1) * limit,
      limit,
      search,
    });

    res.status(200).json({ results: posts, currentPage: page, totalPages, totalPosts });
  }
}

export const postController = new PostController();
