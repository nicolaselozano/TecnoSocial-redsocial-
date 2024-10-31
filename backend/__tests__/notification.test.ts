import con from '@/config/database';
import { Notification } from '@/features/notification/notificationEntity';
import { seed } from '@/utils/seed';
import { dropDB } from '@/utils/seed/drop';
import { StatusCodes } from 'http-status-codes';
import { authRequest } from './helpers/authRequest';
import { request } from './jest.setup';

describe('NOTIFICATION Endpoints', () => {
  beforeAll(async () => {
    if (!con.isInitialized) {
      await con.initialize();
    }
  });

  beforeEach(async () => {
    return await seed({ exit: false });
  });

  afterEach(async () => {
    return await dropDB();
  });

  describe('GET /notification', () => {
    const url = '/api/v1/notification';
    it('should return a 401 response when auth token is not provided', async () => {
      await request.get(url).expect(StatusCodes.UNAUTHORIZED);
    });

    it('should return a 200 response', async () => {
      const userEmailWithNotifications = 'ezequiel@gmail.com';

      const allNotification = await con.getRepository(Notification).count({
        where: {
          post: {
            user: {
              email: userEmailWithNotifications,
            },
          },
        },
      });

      await authRequest({
        email: userEmailWithNotifications,
      })
        .get(url)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(body.totalNotifications).toBe(allNotification);
        });
    });
  });

  describe('GET /notification/:id', () => {
    const url = '/api/v1/notification';
    it('should return a 200 response when looking for a valid id', async () => {
      const allNotification = await con.getRepository(Notification).count();

      await request
        .get(url + '/' + allNotification)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(body.id).toBe(allNotification);
        });
    });

    it('should return a 404 response when looking for an invalid id', async () => {
      const allNotification = await con.getRepository(Notification).count();

      await request.get(url + '/' + (allNotification + 1)).expect(StatusCodes.NOT_FOUND);
    });
  });

  describe('PUT /notification/:id', () => {
    const url = '/api/v1/notification';
    it('should a 201 response when deleting a valid id', async () => {
      const userEmailWithNotifications = 'email@gmail.com';

      const notification = await con.getRepository(Notification).findOne({
        where: {
          post: {
            user: {
              email: userEmailWithNotifications,
            },
          },
        },
      });

      await authRequest({})
        .put(url + '/' + notification?.id)
        .expect(StatusCodes.OK);
    });

    it('should a 403 response when deleting other users notification', async () => {
      const userEmailWithNotifications = 'ezequiel@gmail.com';

      const notification = await con.getRepository(Notification).findOne({
        where: {
          post: {
            user: {
              email: userEmailWithNotifications,
            },
          },
        },
      });

      await authRequest({})
        .put(url + '/' + notification?.id)
        .expect(StatusCodes.FORBIDDEN);
    });
    it('should a 404 response when deleting an invalid id', async () => {
      const allNotifications = await con.getRepository(Notification).count();
      const invalidNotificationId = allNotifications + 1;

      await authRequest({})
        .put(url + '/' + invalidNotificationId)
        .expect(StatusCodes.NOT_FOUND);
    });

    it('should a 401 response when auth token is not provided', async () => {
      await request.put(url + '/1').expect(StatusCodes.UNAUTHORIZED);
    });
    // it('should a 400 response when deleting an already deleted notification');
  });
});
