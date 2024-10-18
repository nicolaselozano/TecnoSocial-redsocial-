import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { CommentController } from './commentController';
const commentRouter = Router();

commentRouter.post('/comment/post/:postid', MiddlewareAuth0.CheckToken, CommentController.createComment);
commentRouter.get('/comment', CommentController.getAllComment);
commentRouter.get('/comment/:id', CommentController.getCommentById);
commentRouter.put('/comment/:id', MiddlewareAuth0.CheckToken, CommentController.updateComment);
commentRouter.delete('/comment/:id', MiddlewareAuth0.CheckToken, CommentController.deleteComment);

export default commentRouter;
