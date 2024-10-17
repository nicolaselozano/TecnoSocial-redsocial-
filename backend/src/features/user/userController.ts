import { BadRequestError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { Request, Response } from 'express';
import { connectionRepository } from '../connection/ConnectionRepository';
import { User } from './userEntity';
import { userRepository } from './userRepository';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const response = await userRepository.createUser(user);
    res.json(response);
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userRepository.getAllUsers();
    res.json(users);
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userRepository.getUserById(Number(id));
    res.json(user);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const response = await userRepository.updateUser(Number(id), user);
    res.json(response);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await userRepository.deleteUser(Number(id));
    res.json(response);
  }

  async getAllFollowers(req: Request, res: Response): Promise<void> {
    const { limit, page, search } = getPaginatedParams(req);
    const { id } = req.params;

    const totalFollowers = await connectionRepository.getFollowedCount({ search, userid: Number(id) });

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
}

export const userController = new UserController();
