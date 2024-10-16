import { Router } from 'express';
import { postController } from './postController';

const postRouter = Router();

postRouter.post('/post', postController.createPost);
postRouter.get('/post', postController.getAllPosts);
postRouter.get('/post/:id', postController.getPostById);
postRouter.put('/post/:id', postController.updatePost);
postRouter.delete('/post/:id', postController.deletePost);

export default postRouter;
