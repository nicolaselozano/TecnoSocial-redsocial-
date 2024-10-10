import { Request, Response } from 'express';
import { commentRepository } from './commentRepository';
import { Comment } from './commentEntity';

class commentController {
  public async createComment(req: Request, res: Response): Promise<void> {
    const { id, content, user, post_id, create_at } = req.body;

    const comment = new Comment();
    comment.id = id;
    comment.content = content;
    comment.user = user;
    comment.post_id = post_id;
    comment.created_at = create_at;

    const response = await commentRepository.createComment(comment);
    res.json(response);
  }

  public async getAllComment(req: Request, res: Response): Promise<void> {
    const comment = await commentRepository.getAllComments();
    res.json(Comment);
  }

  public async getCommentById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const comment = await commentRepository.getCommentsById(Number(id));
    res.json(comment);
  }

  public async updateComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { content, user, post_id, create_at } = req.body;

    const updatedComment = new Comment();
    updatedComment.post_id = post_id;
    updatedComment.user = user;
    updatedComment.created_at = create_at;
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
