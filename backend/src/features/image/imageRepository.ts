import con from '@/config/database';
import { Image } from './imageEntity';

class ImageRepository {
  private repository = con.getRepository(Image);

  public async createImage(user: Image): Promise<Image> {
    return await this.repository.save(user);
  }

  public async updateImage(id: Image['id'], Gallery: Image): Promise<Image> {
    return (await this.repository.update({ id: id }, Gallery)).raw;
  }

  public async deleteImage(id: Image['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const imageRepository = new ImageRepository();
