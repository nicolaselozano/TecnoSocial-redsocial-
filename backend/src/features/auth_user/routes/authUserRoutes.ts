import { Router } from "express";
import { authUserController } from "../controllers/authUserController";
import { MiddlewareAuth0 } from "../../../middlewares/auth/MiddlewareAuth0";

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
router.get(
  "/auth/me",
  CheckToken, 
  authUserController.GetAuthenticatedUser
);

export default router;
