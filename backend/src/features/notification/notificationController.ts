import { Request, Response } from 'express';
import { notificationRepository } from './notificationRepository.js';
import { Notification } from './notificationEntity.js';

export class NotificationController {
  static async getNotifications(req: Request, res: Response) {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
      const [notifications, total] = await notificationRepository.getNotificationsWithPagination(skip, limit); // Cambia a este método

      res.status(200).json({
        data: notifications,
        total,
        page,
        last_page: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  }

  static async createNotification(req: Request, res: Response) {
    const { title, description, postId } = req.body;

    const notification = new Notification();
    notification.title = title;
    notification.description = description;

    // Crea una nueva instancia de Post y asigna solo el id
    notification.post = new postId();
    notification.post.id = postId;

    try {
      const createdNotification = await notificationRepository.createNotification(notification);
      res.status(201).json(createdNotification);
    } catch (error) {
      res.status(500).json({ message: 'Error creating notification', error });
    }
  }
}
