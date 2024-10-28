import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { BadRequestError } from '@/utils/errors';
import { getPaginatedParams } from '@/utils/getPaginatedParams';
import { getUserPutData } from '@/utils/getUserPutData';
import { Request, Response } from 'express';
import { connectionRepository } from '../connection/ConnectionRepository';
import { postRepository } from '../post/postRepository';
import { User } from './userEntity';
import { userRepository } from './userRepository';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;

    const response = await userRepository.createUser(user);
    res.json(response);
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const props = getPaginatedParams(req);

    const options = {
      ...props,
      skip: (props.page - 1) * props.limit,
    };

    const totalUsersCount = await userRepository.getAllUsersCount({ search: props.search });

    const totalPages = Math.ceil(totalUsersCount / props.limit);

    if (props.page > totalPages || props.page < 1) {
      throw new BadRequestError('Página fuera de índice');
    }

    const users = await userRepository.getAllUsers(options);

    const usersWithExtraInfo = await Promise.all(
      users.map(async (u) => {
        const followersCount = await connectionRepository.getFollowersCount({ userid: u.id, search: '' });
        const followedCount = await connectionRepository.getFollowedCount({ userid: u.id, search: '' });
        const postCount = await postRepository.getPostCountByUser(u.id);

        return { ...u, postCount, followersCount, followedCount };
      }),
    );

    res.json({ users: usersWithExtraInfo, totalPages, currentPage: props.page, totalUsers: totalUsersCount });
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userRepository.getUserById(Number(id));
    res.json({
      ...user,
      followerscount: await connectionRepository.getFollowersCount({ userid: Number(id) }),
      followedcount: await connectionRepository.getFollowedCount({ userid: Number(id) }),
    });
  }

  public async updateUser(req: Request, res: ResponseWithUserData): Promise<void> {
    const { authId } = res.locals.userData!;
    const response = await userRepository.updateUser(authId, getUserPutData(req.body));
    res.json(response);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await userRepository.deleteUser(Number(id));
    res.json(response);
  }

  public async getUsersByRole(req: Request, res: Response): Promise<void> {
    const { role } = req.params;
    const users = await userRepository.getAllUsersByRole(role);
    res.json(users);
  }
}

export const userController = new UserController();
