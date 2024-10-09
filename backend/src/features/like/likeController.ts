import { Request, Response } from "express";
import { Like } from "./likeEntity";
import { likeRepository } from "./likeRepository";

class LikeController {
  public async createLike(req: Request, res: Response): Promise<void> {
    try {
      const { post_id, user_id, created_at } = req.body;

      // Validaciones
      if (!post_id || !user_id || !created_at) {
        res.status(400).json({ message: "post_id, user_id y created_at son requeridos" });
        return;
      }

      const like = new Like();
      like.user_id = user_id;
      like.post_id = post_id;
      like.created_at = created_at;

      const response = await likeRepository.createLike(like);
      res.status(201).json(response); // Código de estado 201 para recurso creado
    } catch (error) {
      res.status(500).json({ message: "Error al crear el like", error });
    }
  }

  public async getAllLikes(req: Request, res: Response): Promise<void> {
    try {
      const likes = await likeRepository.getAllLikes();
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los likes", error });
    }
  }

  public async getLikeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const like = await likeRepository.getLikeById(Number(id));
      if (!like) {
        res.status(404).json({ message: "Like no encontrado" });
        return;
      }
      res.json(like);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el like", error });
    }
  }

  public async updateLike(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { created_at, post_id, user_id } = req.body;

      const like = new Like();
      like.id = Number(id); // Asegúrate de que `id` sea un número
      like.user_id = user_id;
      like.post_id = post_id;
      like.created_at = created_at;

      const response = await likeRepository.updateLike(Number(id), like);
      if (!response) {
        res.status(404).json({ message: "Like no encontrado para actualizar" });
        return;
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el like", error });
    }
  }

  public async deleteLike(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const response = await likeRepository.deleteLike(Number(id));
      if (!response) {
        res.status(404).json({ message: "Like no encontrado para eliminar" });
        return;
      }
      res.json({ message: "Like eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el like", error });
    }
  }
}

export const likeController = new LikeController();