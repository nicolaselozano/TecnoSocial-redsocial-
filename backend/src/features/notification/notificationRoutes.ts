import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { NotificationController } from './notificationController';

const notificationRouter = Router();

notificationRouter.get('/notification', MiddlewareAuth0.CheckToken, NotificationController.getNotifications);
notificationRouter.get('/notification/:id', NotificationController.getNotificationsById);
notificationRouter.put('/notification/:id', MiddlewareAuth0.CheckToken, NotificationController.softDeletNotification);

export default notificationRouter;
