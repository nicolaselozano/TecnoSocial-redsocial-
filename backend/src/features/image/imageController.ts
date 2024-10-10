import { Request, Response } from 'express';
import { imageRepository } from './imageRepository';

class ImageController {
  async deleteImage(req: Request, res: Response) {
    const { id } = req.params;
    const result = imageRepository.deleteImage(Number(id));
    res.json(result);
  }
}

export const imageController = new ImageController();
