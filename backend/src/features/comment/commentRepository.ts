import con from '@/config/database';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { User } from '../user/userEntity';
import { Comment } from './commentEntity';

type CommentInsert = Pick<Comment, 'user' | 'post' | 'content'>;
type CommentPut = Pick<Comment, 'content'>;

class CommentRepository {
  private repository = con.getRepository(Comment);

  public async createComment(comment: CommentInsert): Promise<Comment> {
    const result = await this.repository.save(comment);
    return result;
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

  public async userOwnsComment(commentid: Comment['id'], userid: User['authId']) {
    const count = await this.repository.count({
      where: {
        id: commentid,
        user: {
          authId: userid,
        },
      },
    });

    return count === 1;
  }

  public async updateComment(id: Comment['id'], comment: CommentPut): Promise<void> {
    const result = await this.repository.update({ id }, comment);

    if (result.affected !== 1) {
      throw new BadRequestError('hubo un error al modificar el comentario');
    }
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
