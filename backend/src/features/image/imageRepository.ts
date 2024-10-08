import con from "../../config/database";
import { NotFoundError } from "../../utils/errors";
import { Post } from "../post/postEntity";
import { Image } from "./imageEntity";

class PostRepository {
  private repository = con.getRepository(Image);

  public async createImage(user: Image): Promise<Image> {
    return await this.repository.save(user);
  }

  public async getImageById(id: Image["id"]): Promise<Image> {
    const Gallery = await this.repository.findOneBy({ id: id });

    if (!Gallery) {
      throw new NotFoundError(`Image with id ${id} not found`);
    }

    return Gallery;
  }

  public async getImageByPost(post_id: Post["id"]): Promise<Image[]> {
    const images = await this.repository.find({
      where: {
        post_id,
      },
    });

    if (!images.length) {
      throw new NotFoundError(`Image for post id ${post_id} not found`);
    }

    return images;
  }

  public async updateGallery(id: Image["id"], Gallery: Image): Promise<Image> {
    return (await this.repository.update({ id: id }, Gallery)).raw;
  }

  public async deletePost(id: Image["id"]): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const postRepository = new PostRepository();
