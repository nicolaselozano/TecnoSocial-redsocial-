import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { userController } from './userController';

const userRouter = Router();

userRouter.get('/user', userController.getAllUsers);
userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUserById);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.put('/user', MiddlewareAuth0.CheckToken, userController.updateUser);

// Connectios
userRouter.get('/user/:id/followers', userController.getAllFollowers);
userRouter.get('/user/:id/followed', userController.getAllFollowed);

export default userRouter;
