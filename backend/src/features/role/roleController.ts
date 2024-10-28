import { Request, Response } from 'express';
import { roleRepository } from './roleRepository';

class RoleController {
  async getAllRoles(_: Request, res: Response) {
    const roles = await roleRepository.getAllRoles();
    res.json({ roles });
  }
}

export const roleController = new RoleController();
