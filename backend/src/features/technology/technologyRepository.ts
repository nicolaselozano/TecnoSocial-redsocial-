import con from '@/config/database';
import { Technology } from './technologyEntity';

type TechnologyPut = Pick<Technology, 'color'>;

class TechnologyRepository {
  private repository = con.getRepository(Technology);

  public async createTechnology(user: Technology): Promise<Technology> {
    return await this.repository.save(user);
  }

  public async getAllTechnologies(): Promise<Technology[]> {
    return await this.repository.find();
  }

  public async getTechnologyByName(name: Technology['name']): Promise<Technology | null> {
    const technology = await this.repository.findOneBy({ name });
    return technology;
  }

  public async updateTechnology(name: Technology['name'], { color }: TechnologyPut): Promise<Technology> {
    return (
      await this.repository.update(name, {
        color,
      })
    ).raw;
  }

  public async deleteTechnology(id: Technology['name']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const technologyRepository = new TechnologyRepository();
