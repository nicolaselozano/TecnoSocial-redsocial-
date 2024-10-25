import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { likeController } from '../like/likeController';
import { postController } from './postController';

const postRouter = Router();

postRouter.post('/post', MiddlewareAuth0.CheckToken, postController.createPost);
postRouter.get('/post', MiddlewareAuth0.CheckToken, postController.getAllPostsAuthenticated);
postRouter.get('/post/:id', postController.getPostById);
postRouter.put('/post/:id', MiddlewareAuth0.CheckToken, postController.updatePost);
postRouter.delete('/post/:id', MiddlewareAuth0.CheckToken, postController.deletePost);
postRouter.get('/post/user/:userid', postController.getAllPostsByUser);
postRouter.get('/post/:id/followed', postController.followedUsersPostsById);

// Post - Like
postRouter.post('/post/:id/like', MiddlewareAuth0.CheckToken, likeController.createLike);
postRouter.delete('/post/:id/like', MiddlewareAuth0.CheckToken, likeController.deleteLike);

export default postRouter;
