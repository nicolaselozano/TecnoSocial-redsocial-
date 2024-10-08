import con from "../../config/database";
import { NotFoundError } from "../../utils/errors";
import { Post } from "./postEntity";

class PostRepository {
  private repository = con.getRepository(Post);

  public async createPost(user: Post): Promise<Post> {
    return await this.repository.save(user);
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.repository.find();
  }

  public async getPostById(id: Post["id"]): Promise<Post> {
    const post = await this.repository.findOneBy({ id: id });

    if (!post) {
      throw new NotFoundError(`Post with id ${id} not found`);
    }

    return post;
  }

  public async updatePost(id: Post["id"], post: Post): Promise<Post> {
    return (await this.repository.update({ id: id }, post)).raw;
  }

  public async deletePost(id: Post["id"]): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const postRepository = new PostRepository();
