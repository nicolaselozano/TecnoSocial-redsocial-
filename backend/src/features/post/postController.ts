import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError, ConflictErrors, ForbiddenError } from '@/utils/errors';
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
  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, content, user } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    const response = await postRepository.createPost(post);
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

  public async deletePost(req: Request, res: ResponseWithUserData): Promise<void> {
    const { id } = req.params;
    const { email } = res.locals.userData!;

    // Check post exists
    const post = await postRepository.getPostById(Number(id));
    console.log('AuthID:' + post.user.email);

    if (post.user.email !== email) {
      throw new ForbiddenError('forbidden operation');
    }

    const response = await postRepository.deletePost(Number(id));
    res.status(StatusCodes.NO_CONTENT).json(response);
  }

  public async likePost(req: Request, res: ResponseWithUserData): Promise<void> {
    const { id } = req.params;
    const { email } = res.locals.userData!;

    const post = await postRepository.getPostById(Number(id));
    const user = await userRepository.getUserByEmail(email);

    const userHasLikedPost = await likeRepository.userHasLikedPost({ postid: post.id, userid: user.id });

    if (userHasLikedPost) {
      throw new ConflictErrors('user has already liked this post');
    }

    const like = likeRepository.createLike({
      post,
      user,
    });

    res.status(StatusCodes.CREATED).json({
      like,
    });
  }

  public async followedUsersPostsById(req: Request, res: Response): Promise<void> {
    const { search } = getPaginatedParams(req);
    const { id } = req.params;

    const followed = await connectionRepository.getAllFollowed({
      search: search,
      userid: Number(id),
    });

    const posts = followed.map(async (user) => {
      return await postRepository.getPostById(user.id);
    });

    Promise.all(posts)
      .then((posts) => {
        if (posts.length === 0) {
          res.status(StatusCodes.NO_CONTENT).json([]);
        } else {
          res.json(posts);
        }
      })
      .catch(() => {
        res.status(StatusCodes.NO_CONTENT).json([]);
      });
  }
}

export const postController = new PostController();
