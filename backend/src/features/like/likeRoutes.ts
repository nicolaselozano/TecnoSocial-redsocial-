import { Router } from "express";
import { likeController } from "./likeController";

const likeRouter = Router();

likeRouter.post("/like", likeController.createLike);
likeRouter.get("/like", likeController.getAllLikes);
likeRouter.get("/like/:id", likeController.getLikeById);
likeRouter.put("/like/:id", likeController.updateLike);
likeRouter.delete("/like/:id", likeController.deleteLike);

export default likeRouter;
