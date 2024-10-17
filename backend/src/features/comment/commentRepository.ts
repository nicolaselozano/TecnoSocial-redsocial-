import con from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { Comment } from './commentEntity';

class CommentRepository {
  private repository = con.getRepository(Comment);

  public async createComment(comment: Comment): Promise<Comment> {
    return await this.repository.save(comment);
  }

  public async getAllComments(): Promise<Comment[]> {
    return await this.repository.find();
  }

  public async getCommentsById(id: Comment['id']): Promise<Comment> {
    const comment = await this.repository.findOneBy({ id: id });

    if (!comment) {
      throw new NotFoundError(`Comment with id ${id} not found`);
    }

    return comment;
  }

  public async updateComment(id: Comment['id'], comment: Comment): Promise<Comment> {
    await this.repository.update({ id: id }, comment);
    return await this.getCommentsById(id);
  }

  public async deleteComment(id: Comment['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
  public async countComments(postId: number): Promise<number> {
    const count = await this.repository.count({
      where: {
        post: {
          id: postId,
        },
      },
    });
    return count;
  }
}

export const commentRepository = new CommentRepository();
