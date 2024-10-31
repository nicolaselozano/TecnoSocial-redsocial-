import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../user/userRepository';
import { connectionRepository } from './ConnectionRepository';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';

class ConnectionController {
  async createConnectionController(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserDataToken | undefined = res.locals['userData'];
      //el id corresponde al auth id
      const { id } = req.params;
      if (userData?.authId) {
        const newConnection = await connectionRepository.setConnection(userData?.authId, id);
        res.status(200).json(newConnection);
      } else {
        throw new Error('El usuario no esta autenticado');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

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

    console.log('Search: ', search);

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
    const { id, followedid } = req.params;

    const search = '';
    const limit = 10;
    const page = 1;

    let alreadyFollowed: boolean = false;

    const totalFollowed = await connectionRepository.getFollowedCount({ search, userid: Number(id) });
    if (totalFollowed > 0) {
      const followed = await connectionRepository.getAllFollowed({
        search,
        userid: Number(id),
        limit,
        skip: (page - 1) * limit,
      });

      followed.map((f) => {
        if (f.id === Number(followedid)) {
          alreadyFollowed = true;
        }
      });

      if (alreadyFollowed) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Ya sigues a este usuario',
        });
      } else {
        await connectionRepository.createConnection(Number(followedid), Number(id));
        res.status(StatusCodes.CREATED).json({
          message: 'followed created succesfully',
        });
      }
    }
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
