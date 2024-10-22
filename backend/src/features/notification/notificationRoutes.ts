import { Router } from 'express';
import { NotificationController } from './notificationController';

const router = Router();

// Ruta para obtener todas las notificaciones con paginación
router.get('/', NotificationController.getNotifications);

// Ruta para crear una nueva notificación
router.post('/', NotificationController.createNotification);

// Ruta para obtener una notificación por ID
router.get('/:id', NotificationController.getNotifications);

// Ruta para actualizar una notificación existente
router.put('/:id', NotificationController.createNotification);

// Ruta para eliminar una notificación
router.delete('/:id', NotificationController.getNotifications);

export default router;
