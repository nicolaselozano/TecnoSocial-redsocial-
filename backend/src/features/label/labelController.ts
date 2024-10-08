import { Request, Response } from "express";
import { Label } from "./labelEntity";
import { labelRepository } from "./labelRepository";

class LabelController {
  public async createLabel(req: Request, res: Response): Promise<void> {
    const { name, color } = req.body;

    const label = new Label();
    label.name = name;
    label.color = color;

    const response = await labelRepository.createLabel(label);
    res.json(response);
  }

  public async getAllLabels(req: Request, res: Response): Promise<void> {
    const posts = await labelRepository.getAllLabels();
    res.json(posts);
  }

  public async getLabelById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const post = await labelRepository.getLabelByName(id);
    res.json(post);
  }

  public async updateLabel(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, color } = req.body;

    const label = new Label();
    label.name = name;
    label.color = color;

    const response = await labelRepository.updateLabel(id, label);
    res.json(response);
  }

  public async deleteLabel(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await labelRepository.deleteLabel(id);
    res.json(response);
  }
}

export const labelController = new LabelController();
