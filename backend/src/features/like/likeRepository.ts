import con from '../../config/database';
import { Post } from '../post/postEntity';
import { User } from '../user/userEntity';
import { Like } from './likeEntity';

type UserHasLikedPost = {
  userid: User['id'];
  postid: Post['id'];
};

type LikeInsert = Pick<Like, 'post' | 'user'>;

class LikeRepository {
  private repository = con.getRepository(Like);

  public async createLike(like: LikeInsert): Promise<Like> {
    const results = await this.repository.save(like);
    return results;
  }

  public async getAllLikes(): Promise<Like[]> {
    const likes = await this.repository.find();
    return likes.map((like) => Object.assign(new Like(), like));
  }

  public async getLikeById(id: Like['id']): Promise<Like | null> {
    const like = await this.repository.findOne({ where: { id: id } });

    if (!like) {
      return null;
    }

    return Object.assign(new Like(), like);
  }

  public async updateLike(id: Like['id'], updatedLike: Like): Promise<Like | null> {
    const result = await this.repository.update(id, updatedLike);

    if (result.affected === 0) {
      return null;
    }

    return this.getLikeById(id);
  }

  public async deleteLike(id: Like['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async getLikesByUser(userId: number) {
    const likes = await this.repository.find({
      where: { user: { id: userId } },
    });

    return likes;
  }

  public async userHasLikedPost({ postid, userid }: UserHasLikedPost) {
    const results = await this.repository.findOne({
      where: {
        post: {
          id: postid,
        },
        user: {
          id: userid,
        },
      },
    });

    return results !== null;
  }
  public async countLikes(postId: number): Promise<number> {
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

export const likeRepository = new LikeRepository();
