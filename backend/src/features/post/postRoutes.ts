import { Router } from 'express';
import { postController } from './postController';
import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';

const postRouter = Router();

postRouter.post('/post', MiddlewareAuth0.CheckToken, postController.createPost);
postRouter.get('/post', postController.getAllPosts);
postRouter.get('/post/:id', postController.getPostById);
postRouter.put('/post/:id', postController.updatePost);
postRouter.delete('/post/:id', postController.deletePost);

export default postRouter;
