import con from '@/config/database';
import { Notification } from './notificationEntity';

class NotificationRepository {
  private repository = con.getRepository(Notification);

  public async createNotification(notification: Notification): Promise<Notification> {
    return await this.repository.save(notification);
  }

  public async getAllNotification(): Promise<Notification[]> {
    const notifications = await this.repository.find();
    return notifications.map((notification) => Object.assign(new Notification(), notification));
  }

  public async getNotificationById(id: Notification['id']): Promise<Notification | null> {
    const notification = await this.repository.findOne({ where: { id: id } });

    if (!notification) {
      return null;
    }

    return Object.assign(new Notification(), notification);
  }

  public async updateNotification(
    id: Notification['id'],
    updatedNotification: Notification,
  ): Promise<Notification | null> {
    const result = await this.repository.update(id, updatedNotification);

    if (result.affected === 0) {
      return null;
    }

    return this.getNotificationById(id);
  }

  public async deleteNotification(id: Notification['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async getNotificationsByPostId(postId: number): Promise<Notification[]> {
    const notifications = await this.repository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    return notifications;
  }

  // Nuevo método para obtener notificaciones con paginación
  public async getNotificationsWithPagination(skip: number, take: number): Promise<[Notification[], number]> {
    return await this.repository.findAndCount({
      skip,
      take,
      relations: ['post'], // Asegura que la relación con 'post' esté cargada
    });
  }

  public async countNotifications(): Promise<number> {
    const count = await this.repository.count();
    return count;
  }
}

export const notificationRepository = new NotificationRepository();
