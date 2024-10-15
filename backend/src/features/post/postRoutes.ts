import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { postController } from './postController';

const postRouter = Router();

postRouter.post('/post', MiddlewareAuth0.CheckToken, postController.createPost);
postRouter.get('/post', postController.getAllPosts);
postRouter.get('/post/:id', postController.getPostById);
postRouter.put('/post/:id', postController.updatePost);
postRouter.delete('/post/:id', postController.deletePost);
postRouter.get('/post/user/:userid', postController.getAllPostsByUser);

export default postRouter;
