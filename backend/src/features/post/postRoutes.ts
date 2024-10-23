import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { postController } from './postController';

const postRouter = Router();

postRouter.post('/post', MiddlewareAuth0.CheckToken, postController.createPost);
postRouter.get('/post', postController.getAllPosts);
postRouter.get('/post/:id', postController.getPostById);
postRouter.put('/post/:id', MiddlewareAuth0.CheckToken, postController.updatePost);
postRouter.delete('/post/:id', MiddlewareAuth0.CheckToken, postController.deletePost);
postRouter.get('/post/user/:userid', postController.getAllPostsByUser);
postRouter.post('/post/:id/like', MiddlewareAuth0.CheckToken, postController.likePost);

export default postRouter;
