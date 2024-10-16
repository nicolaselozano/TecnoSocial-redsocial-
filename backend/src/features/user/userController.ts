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
    const { id } = req.params;
    const followers = await connectionRepository.getAllFollowers(Number(id));
    res.json(followers);
  }

  async getAllFollowings(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const followed = await connectionRepository.getAllFollowings(Number(id));
    res.json(followed);
  }
}

export const userController = new UserController();
