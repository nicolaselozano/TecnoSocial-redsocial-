import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { UnauthorizedError } from '@/utils/errors';
import { Request, Response } from 'express';
import { postRepository } from '../post/postRepository';
import { userRepository } from '../user/userRepository';
import { commentRepository } from './commentRepository';

class commentController {
  public async createComment(req: Request, res: ResponseWithUserData): Promise<void> {
    const { content } = req.body;
    const { postid } = req.params;
    const { authId } = res.locals.userData!;

    const user = await userRepository.getUserByAuthId(authId);
    const post = await postRepository.getPostById(Number(postid));

    const response = await commentRepository.createComment({
      content,
      user,
      post,
    });
    res.json(response);
  }

  public async getAllComment(req: Request, res: Response): Promise<void> {
    const comments = await commentRepository.getAllComments();
    res.json(comments);
  }

  public async getCommentById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const comment = await commentRepository.getCommentsById(Number(id));
    res.json(comment);
  }

  public async updateComment(req: Request, res: ResponseWithUserData): Promise<void> {
    const { id } = req.params;
    const { authId } = res.locals.userData!;
    const { content } = req.body;

    if (!commentRepository.userOwnsComment(Number(id), authId)) {
      throw new UnauthorizedError('user is not the author of this comment');
    }

    await commentRepository.updateComment(Number(id), { content });

    res.json({
      message: 'comentario modificado correctamente',
    });
  }

  public async deleteComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { authId } = res.locals.userData!;

    if (!commentRepository.userOwnsComment(Number(id), authId)) {
      throw new UnauthorizedError('user is not the author of this comment');
    }

    const response = await commentRepository.deleteComment(Number(id));
    res.json(response);
  }
}

export const CommentController = new commentController();
