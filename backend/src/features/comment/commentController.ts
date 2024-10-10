import { Request, Response } from 'express';
import { Comment } from './commentEntity';
import { commentRepository } from './commentRepository';

class commentController {
  public async createComment(req: Request, res: Response): Promise<void> {
    const { content } = req.body;

    const comment = new Comment();
    comment.content = content;

    const response = await commentRepository.createComment(comment);
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

  public async updateComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = new Comment();
    updatedComment.content = content;

    const response = await commentRepository.updateComment(Number(id), updatedComment);
    res.json(response);
  }

  public async deleteComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await commentRepository.deleteComment(Number(id));
    res.json(response);
  }
}

export const CommentController = new commentController();
