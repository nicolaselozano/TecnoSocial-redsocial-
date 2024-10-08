import con from "../../config/database";
import { Label } from "./labelEntity";

class LabelRepository {
  private repository = con.getRepository(Label);

  public async createLabel(user: Label): Promise<Label> {
    return await this.repository.save(user);
  }

  public async getAllLabels(): Promise<Label[]> {
    return await this.repository.find();
  }

  public async getLabelByName(name): Promise<Label> {
    return await this.repository.findOneBy({ name });
  }

  public async updateLabel(id, Label: Label): Promise<Label> {
    return (await this.repository.update(id, Label)).raw;
  }

  public async deleteLabel(id): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const labelRepository = new LabelRepository();
