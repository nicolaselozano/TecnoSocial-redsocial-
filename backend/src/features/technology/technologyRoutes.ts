import { Router } from 'express';
import { technologyController } from './technologyController';

const technologyRouter = Router();

technologyRouter.post('/label', technologyController.createTechnology);
technologyRouter.get('/label', technologyController.getAllTechnologies);
technologyRouter.get('/label/:name', technologyController.getTechnologyById);
technologyRouter.put('/label/:name', technologyController.updateTechnology);
technologyRouter.delete('/label/:name', technologyController.deleteTechnology);

export default technologyRouter;
