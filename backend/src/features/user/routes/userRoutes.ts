import { Router } from "express";
import { userController } from "../controller/userController";

const userRouter = Router();

userRouter.post("/usuario", userController.createUser);
userRouter.get("/usuario", userController.getAllUsers);
userRouter.get("/usuario/:id", userController.getUserById);
userRouter.put("/usuario/:id", userController.updateUser);
userRouter.delete("/usuario/:id", userController.deleteUser);

export default userRouter;
