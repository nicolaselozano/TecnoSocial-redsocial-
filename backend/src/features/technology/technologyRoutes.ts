import { Router } from 'express';
import { technologyController } from './technologyController';

const technologyRouter = Router();

technologyRouter.post('/technology', technologyController.createTechnology);
technologyRouter.get('/technology', technologyController.getAllTechnologies);
technologyRouter.get('/technology/:name', technologyController.getTechnologyByName);
technologyRouter.put('/technology/:name', technologyController.updateTechnology);
technologyRouter.delete('/technology/:name', technologyController.deleteTechnology);

export default technologyRouter;
