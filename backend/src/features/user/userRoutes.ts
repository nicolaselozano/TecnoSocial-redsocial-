import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { connectionController } from '../connection/ConnectionController';
import { userController } from './userController';

const userRouter = Router();

userRouter.get('/user', userController.getAllUsers);
userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUserById);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.put('/user', MiddlewareAuth0.CheckToken, userController.updateUser);

// Roles
userRouter.get('/user/role/:role', userController.getUsersByRole);

// Connections
userRouter.get('/user/:id/followers', connectionController.getAllFollowers);
userRouter.get('/user/:id/followed', connectionController.getAllFollowed);
//userRouter.post('/user/:id/followed/:followedid', MiddlewareAuth0.CheckToken, connectionController.createFollowed);
userRouter.post('/user/:id/followed/:followedid', connectionController.createFollowed);
userRouter.delete('/user/followed/:followedid', MiddlewareAuth0.CheckToken, connectionController.deleteFollowed);

export default userRouter;
