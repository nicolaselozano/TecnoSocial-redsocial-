import { authUserController } from '@/features/auth_user/controllers/authUserController';
import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';

const router = Router();
const { CheckToken, SetToken } = MiddlewareAuth0;

router.post('/auth/register', SetToken, CheckToken, authUserController.CreateUserAuthC);
router.get('/auth/login', SetToken, CheckToken, authUserController.CreateUserAuthC);
router.get('/auth/me', CheckToken, authUserController.GetAuthenticatedUser);

export default router;
