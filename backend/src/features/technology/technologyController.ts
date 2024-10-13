import { Request, Response } from 'express';
import { Technology } from './technologyEntity';
import { technologyRepository } from './technologyRepository';

class TechnologyController {
  public async createTechnology(req: Request, res: Response): Promise<void> {
    const { name, color } = req.body;

    const technology = new Technology();
    technology.name = name;
    technology.color = color;

    const response = await technologyRepository.createTechnology(technology);
    res.json(response);
  }

  public async getAllTechnologies(req: Request, res: Response): Promise<void> {
    const posts = await technologyRepository.getAllTechnologies();
    res.json(posts);
  }

  public async getTechnologyByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    const post = await technologyRepository.getTechnologyByName(name);
    res.json(post);
  }

  public async updateTechnology(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, color } = req.body;

    const technology = new Technology();
    technology.name = name;
    technology.color = color;

    const response = await technologyRepository.updateTechnology(id, technology);
    res.json(response);
  }

  public async deleteTechnology(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await technologyRepository.deleteTechnology(id);
    res.json(response);
  }
}

export const technologyController = new TechnologyController();
