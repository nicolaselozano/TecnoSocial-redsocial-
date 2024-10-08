import { Router } from "express";
import { projectController } from "./projectController";

const projectRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: API para gestionar proyectos
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proyecto creado
 */
projectRouter.post("/v1/project", projectController.createProject);

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Obtiene todos los proyectos
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
projectRouter.get("/v1/project", projectController.getAllProjects);

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Obtiene un proyecto por ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.get("/project/:id", projectController.getProjectById);

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Actualiza un proyecto por ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.put("/project/:id", projectController.updateProject);

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Elimina un proyecto por ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       204:
 *         description: Proyecto eliminado
 *       404:
 *         description: Proyecto no encontrado
 */
projectRouter.delete("/project/:id", projectController.deleteProject);

export default projectRouter;
