import { Router } from "express";
import { labelController } from "./labelController";

const labelRouter = Router();

labelRouter.post("/label", labelController.createLabel);
labelRouter.get("/label", labelController.getAllLabels);
labelRouter.get("/label/:id", labelController.getLabelById);
labelRouter.put("/label/:id", labelController.updateLabel);
labelRouter.delete("/label/:id", labelController.deleteLabel);

export default labelRouter;
