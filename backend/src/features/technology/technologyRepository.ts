import con from '@/config/database';
import { Technology } from './technologyEntity';

class TechnologyRepository {
  private repository = con.getRepository(Technology);

  public async createTechnology(user: Technology): Promise<Technology> {
    return await this.repository.save(user);
  }

  public async getAllTechnologies(): Promise<Technology[]> {
    return await this.repository.find();
  }

  public async getTechnologyByName(name): Promise<Technology> {
    return await this.repository.findOneBy({ name });
  }

  public async updateTechnology(id, Label: Technology): Promise<Technology> {
    return (await this.repository.update(id, Label)).raw;
  }

  public async deleteTechnology(id): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const technologyRepository = new TechnologyRepository();
