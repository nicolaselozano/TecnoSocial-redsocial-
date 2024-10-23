import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError, ForbiddenError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Notification } from './notificationEntity';
import { notificationRepository } from './notificationRepository';

export class NotificationController {
  static async getNotifications(req: Request, res: ResponseWithUserData) {
    const { email } = res.locals.userData!;
    const { limit, page } = getPaginatedParams(req);
    const skip = (page - 1) * limit;

    const totalNotifications = await notificationRepository.getTotalNotificationsByUser(email);

    const totalPages = Math.ceil(totalNotifications / limit!);

    if (page > totalPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const notifications = await notificationRepository.getNotificationByUser({ email, limit, skip });

    res.json({
      notifications,
      currentPage: page,
      totalPages,
      totalNotifications,
      page,
    });
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

  static async getNotificationsById(req: Request, res: Response) {
    const { id } = req.params;
    const notification = await notificationRepository.getNotificationById(Number(id));
    res.json(notification);
  }

  static async softDeletNotification(req: Request, res: ResponseWithUserData) {
    const { id } = req.params;
    const { email } = res.locals.userData!;

    await notificationRepository.getNotificationById(Number(id));

    const userIsOwner = await notificationRepository.userIsOwner(Number(id), email);

    if (!userIsOwner) {
      throw new ForbiddenError('no se pueden borrar notificaciones pertenecientes a otros usuarios');
    }

    const result = await notificationRepository.softDelete(Number(id));

    if (!result) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'hubo un error actualizando la notificaion' }).end();
    }
    res.json({
      message: 'notificaion actualizada correctamente',
    });
  }
}
