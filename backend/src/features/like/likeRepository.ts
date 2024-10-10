import { Like as TypeOrmLike } from 'typeorm'; // Renombramos para evitar confusión con la entidad de TypeORM
import { Like } from './likeEntity'; // Asegúrate de que esta entidad esté correctamente definida
import con from '../../config/database'; // Asegúrate de que esta ruta sea correcta

class LikeRepository {
  // Usamos TypeOrmLike para referirnos a la entidad de TypeORM
  private repository = con.getRepository(TypeOrmLike);

  // Método para crear un nuevo like
  public async createLike(like: Like): Promise<Like> {
    return await this.repository.save(like); // Guarda el objeto like
  }

  // Método para obtener todos los likes
  public async getAllLikes(): Promise<Like[]> {
    const likes = await this.repository.find(); // Obtiene todos los likes como objetos
    return likes.map((like) => Object.assign(new Like(), like)); // Convierte cada objeto a tipo Like
  }

  // Método para obtener un like por su ID
  public async getLikeById(id: Like['id']): Promise<Like | null> {
    const like = await this.repository.findOne({ where: { id: id } }); // Busca un like por ID

    if (!like) {
      return null; // Si no se encuentra, devuelve null
    }

    return Object.assign(new Like(), like); // Convierte el objeto a tipo Like
  }

  // Método para actualizar un like existente
  public async updateLike(id: Like['id'], updatedLike: Like): Promise<Like | null> {
    const result = await this.repository.update(id, updatedLike); // Actualiza el like

    if (result.affected === 0) {
      return null; // Devuelve null si no se encontró el like para actualizar
    }

    return this.getLikeById(id); // Retorna el like actualizado
  }

  // Método para eliminar un like
  public async deleteLike(id: Like['id']): Promise<boolean> {
    const result = await this.repository.delete(id); // Elimina el like por ID
    return result.affected === 1; // Devuelve true si se eliminó el like
  }
}

export const likeRepository = new LikeRepository(); // Exportamos una instancia de LikeRepository
