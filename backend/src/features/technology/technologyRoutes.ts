import { Router } from "express";
import { technologyController } from "./technologyController";

const technologyRouter = Router();

technologyRouter.post("/label", technologyController.createTechnology);
technologyRouter.get("/label", technologyController.getAllTechnologies);
technologyRouter.get("/label/:id", technologyController.getTechnologyById);
technologyRouter.put("/label/:id", technologyController.updateTechnology);
technologyRouter.delete("/label/:id", technologyController.deleteTechnology);

export default technologyRouter;
