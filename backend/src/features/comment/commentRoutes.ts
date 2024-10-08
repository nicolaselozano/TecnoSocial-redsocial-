import { Router } from "express";
import { CommentController } from "./commentController"; 
const commentRouter = Router();

commentRouter.post("/comment", CommentController.createComment);
commentRouter.get("/comment", CommentController.getAllComment); 
commentRouter.get("/comment/:id", CommentController.getCommentById);
commentRouter.put("/comment/:id", CommentController.updateComment);
commentRouter.delete("/comment/:id", CommentController.deleteComment);

export default commentRouter;
