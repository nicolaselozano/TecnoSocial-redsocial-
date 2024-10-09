import { Router } from "express";
import { MiddlewareAuth0 } from "../../../middlewares/Auth/MiddlewareAuth0";
import { authUserController } from "../controllers/authUserController";

const router = Router();
const { CheckToken, SetToken } = MiddlewareAuth0;

router.post(
  "/auth/register",
  SetToken,
  CheckToken,
  authUserController.CreateUserAuthC
);

router.get(
  "/auth/login",
  SetToken,
  CheckToken,
  authUserController.CreateUserAuthC
);

export default router;
