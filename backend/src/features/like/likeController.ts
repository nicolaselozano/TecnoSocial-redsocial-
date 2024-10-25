import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { ConflictErrors, NotFoundError } from '@/utils/errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { postRepository } from '../post/postRepository';
import { userRepository } from '../user/userRepository';
import { likeRepository } from './likeRepository';
class LikeController {
  public async createLike(req: Request, res: ResponseWithUserData): Promise<void> {
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

  public async getAllLikes(req: Request, res: Response): Promise<void> {
    try {
      const likes = await likeRepository.getAllLikes();
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los likes', error });
    }
  }

  public async getLikeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const like = await likeRepository.getLikeById(Number(id));
      if (!like) {
        res.status(404).json({ message: 'Like no encontrado' });
        return;
      }
      res.json(like);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el like', error });
    }
  }

  public async deleteLike(req: Request, res: ResponseWithUserData): Promise<void> {
    const { id } = req.params;
    const { email } = res.locals.userData!;

    const user = await userRepository.getUserByEmail(email);

    const result = await likeRepository.getLikeByPostAndUser(Number(id), user.id);

    if (!result) {
      throw new NotFoundError('user hasn`t liked this post');
    }

    await likeRepository.deleteLike(result.id);

    res.status(StatusCodes.NO_CONTENT).json({
      message: 'like removed succesfully',
    });
  }
  public async getUserLikes(req: Request, res: Response): Promise<void> {
    try {
      const { userid } = req.params;

      const likes = await likeRepository.getLikesByUser(Number(userid));

      if (likes.length === 0) {
        res.status(404).json({ message: 'No se encontraron likes para el usuario.' });
        return;
      }

      res.json({
        results: likes,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los likes del usuario', error });
    }
  }
}
export const likeController = new LikeController();
