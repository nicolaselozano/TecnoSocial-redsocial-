import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../user/userRepository';
import { connectionRepository } from './ConnectionRepository';

class ConnectionController {
  async getAllFollowers(req: Request, res: Response): Promise<void> {
    const { limit, page, search } = getPaginatedParams(req);
    const { id } = req.params;

    await userRepository.getUserById(Number(id));
    const totalFollowers = await connectionRepository.getFollowersCount({ search, userid: Number(id) });

    if (totalFollowers === 0) {
      res.json({
        followers: [],
        currentPage: page,
        totalUsers: 0,
        totalPages: 0,
      });
      return;
    }

    const totalFollowersPages = Math.ceil(totalFollowers / limit);

    if (page > totalFollowersPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const followers = await connectionRepository.getAllFollowers({
      search,
      userid: Number(id),
      limit,
      skip: (page - 1) * limit,
    });

    res.json({
      followers,
      currentPage: page,
      totalUsers: totalFollowers,
      totalPages: totalFollowersPages,
    });
  }

  async getAllFollowed(req: Request, res: Response): Promise<void> {
    const { limit, page, search } = getPaginatedParams(req);
    const { id } = req.params;

    await userRepository.getUserById(Number(id));
    const totalFollowed = await connectionRepository.getFollowedCount({ search, userid: Number(id) });

    if (totalFollowed === 0) {
      res.json({
        followed: [],
        currentPage: page,
        totalUsers: 0,
        totalPages: 0,
      });
      return;
    }

    const totalFollowingPages = Math.ceil(totalFollowed / limit);

    if (page > totalFollowingPages || page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const followed = await connectionRepository.getAllFollowed({
      search,
      userid: Number(id),
      limit,
      skip: (page - 1) * limit,
    });

    res.json({
      followed,
      currentPage: page,
      totalUsers: totalFollowed,
      totalPages: totalFollowingPages,
    });
  }

  async createFollowed(req: Request, res: ResponseWithUserData) {
    //const { email } = res.locals.userData!;
    const { id, followedid } = req.params;

    const user1 = await userRepository.getUserById(Number(id));
    const user2 = await userRepository.getUserById(Number(followedid));

    //const connection = await connectionRepository.getFollowedConnection(Number(followedid));

    // if (connection) {
    //   throw new BadRequestError('Ya sigues a este usuario');
    // }

    //await connectionRepository.createConnection(Number(followedid), Number(id));

    res.json({
      user1,
      user2,
    });

    // res.status(StatusCodes.CREATED).json({
    //   message: 'followed created succesfully',
    // });
  }

  async deleteFollowed(req: Request, res: ResponseWithUserData) {
    const { email } = res.locals.userData!;
    const { followedid } = req.params;

    const connection = await connectionRepository.getFollowedConnection(Number(followedid), email);

    await connectionRepository.deleteConnection(connection?.id);

    res.status(StatusCodes.NO_CONTENT).json({
      message: 'followed removed succesfully',
    });
  }
}

export const connectionController = new ConnectionController();
