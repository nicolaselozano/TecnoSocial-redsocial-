import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { User } from '../user/userEntity';
import { Notification } from './notificationEntity';

type NotifacionPaginatedConfig = {
  email: User['email'];
} & PaginatedConfig;

class NotificationRepository {
  private repository = con.getRepository(Notification);

  public async createNotification(notification: Notification): Promise<Notification> {
    return await this.repository.save(notification);
  }

  public async getAllNotification(): Promise<Notification[]> {
    const notifications = await this.repository.find({
      where: {
        soft_delete: false,
      },
    });
    return notifications;
  }

  public async getNotificationById(id: Notification['id']): Promise<Notification> {
    const notification = await this.repository.findOne({ where: { id: id } });

    if (!notification) {
      throw new NotFoundError(`Notification with id ${id} not found`);
    }

    return notification;
  }

  public async userIsOwner(id: Notification['id'], email: User['email']): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id,
        post: {
          user: {
            email,
          },
        },
      },
    });

    return count === 1;
  }

  public async softDelete(id: Notification['id']): Promise<boolean> {
    const result = await this.repository.update(id, {
      soft_delete: true,
    });

    return result.affected === 1;
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

  public async getNotificationsByPost(postId: number): Promise<Notification[]> {
    const notifications = await this.repository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    return notifications;
  }

  public async getTotalNotificationsByUser(email: User['email']) {
    const count = await this.repository.count({
      where: {
        soft_delete: false,
        post: {
          user: {
            email,
          },
        },
      },
    });
    return count;
  }

  public async getNotificationByUser({ email, limit, skip }: NotifacionPaginatedConfig): Promise<Notification[]> {
    const results = await this.repository.find({
      take: limit,
      skip,
      where: {
        soft_delete: false,
        post: {
          user: {
            email,
          },
        },
      },
    });
    return results;
  }
}

export const notificationRepository = new NotificationRepository();
