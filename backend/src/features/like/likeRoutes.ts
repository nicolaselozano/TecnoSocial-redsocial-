import { Router } from 'express';
import { likeController } from './likeController';
const likeRouter = Router();

likeRouter.post('/like', likeController.createLike);
likeRouter.get('/like', likeController.getAllLikes);
likeRouter.get('/like/:id', likeController.getLikeById);
likeRouter.delete('/like/:id', likeController.deleteLike);
likeRouter.get('/like/user/:userid', likeController.getUserLikes);

export default likeRouter;
