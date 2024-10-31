import { Router } from 'express';
import { roleController } from './roleController';

const roleRouter = Router();

roleRouter.get('/role', roleController.getAllRoles);

export { roleRouter };
