import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { imageController } from './imageController';

const imageRouter = Router();

imageRouter.delete('/image/:id', MiddlewareAuth0.CheckToken, imageController.deleteImage);

export default imageRouter;
