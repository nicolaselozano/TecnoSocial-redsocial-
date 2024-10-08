import { Router } from "express";
import { authUserController } from "../controllers/authUserController";
import { MiddlewareAuth0 } from "../../../middlewares/auth/MiddlewareAuth0";

const router = Router();
const { CheckToken, SetToken } = MiddlewareAuth0;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la petición
 */
router.post(
  "/auth/register",
  SetToken,
  CheckToken,
  authUserController.CreateUserAuthC
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   get:
 *     summary: Autenticar usuario y generar token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Error de autenticación
 */
router.get(
  "/auth/login",
  SetToken,
  CheckToken,
  authUserController.CreateUserAuthC
);
/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Verifica si el usuario está autenticado
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Token no válido o ausente
 */
router.get(
  "/auth/me",
  CheckToken, 
  authUserController.GetAuthenticatedUser
);

export default router;
