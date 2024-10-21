import { Router } from 'express';
import { userController } from './userController';

const userRouter = Router();

userRouter.get('/user', userController.getAllUsers);
userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUserById);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

userRouter.get('/user/:id/followers', userController.getAllFollowers);
userRouter.get('/user/:id/followed', userController.getAllFollowings);

export default userRouter;
