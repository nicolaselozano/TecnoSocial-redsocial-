import { Router } from 'express';
import { projectController } from './projectController';

const projectRouter = Router();

projectRouter.post('/project', projectController.createProject);
projectRouter.get('/project', projectController.getAllProjects);
projectRouter.get('/project/:id', projectController.getProjectById);
projectRouter.put('/project/:id', projectController.updateProject);
projectRouter.delete('/project/:id', projectController.deleteProject);

export default projectRouter;
