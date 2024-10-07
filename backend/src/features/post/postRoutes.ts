import { Router } from "express";
import { postController } from "./postController";

const postRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API para gestionar posts
 */

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Crea un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: post creado
 */
postRouter.post("/post", postController.createPost);

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: Obtiene todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 */

postRouter.get("/post", postController.getAllPosts);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Obtiene un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: post encontrado
 *       404:
 *         description: post no encontrado
 */

postRouter.get("/post/:id", postController.getPostById);

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: Actualiza un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: post actualizado
 *       404:
 *         description: post no encontrado
 */
postRouter.put("/post/:id", postController.updatePost);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Elimina un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post
 *     responses:
 *       204:
 *         description: post eliminado
 *       404:
 *         description: post no encontrado
 */
postRouter.delete("/post/:id", postController.deletePost);

export default postRouter;
