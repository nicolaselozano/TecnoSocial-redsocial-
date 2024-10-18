import { Request, Response } from 'express';
import { technologyRepository } from './technologyRepository';
import { technologyService } from './technologyService';

class TechnologyController {
  public async createTechnology(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const response = await technologyService.createTechnology(name);
    res.json(response);
  }

  public async getAllTechnologies(req: Request, res: Response): Promise<void> {
    const posts = await technologyRepository.getAllTechnologies();
    res.json(posts);
  }

  public async getTechnologyByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    const post = await technologyRepository.getTechnologyByName(name);
    res.status(201).json(post);
  }

  public async updateTechnology(req: Request, res: Response): Promise<void> {
    const { name } = req.params;
    const { color } = req.body;
    const response = await technologyRepository.updateTechnology(name, { color });
    res.status(201).json(response);
  }

  public async deleteTechnology(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await technologyRepository.deleteTechnology(id);
    res.status(204).json(response);
  }
}

export const technologyController = new TechnologyController();
