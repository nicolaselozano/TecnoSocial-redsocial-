import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { User } from './userEntity';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';

type UserPut = Pick<User, 'avatar' | 'location' | 'name' | 'role' | 'job'>;

class UserRopository {
  private repository = con.getRepository(User);

  public async createUser(user: Partial<UserDataToken>): Promise<User> {
    const response = await this.repository.save({
      authId: user.authId,
      authName: user.authName,
      email: user.email,
      name: user.authName,
    });
    return response;
  }

  public async getAllUsersCount({ search }: PaginatedConfig): Promise<number> {
    return await this.repository.count({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  public async getAllUsers({ limit, search, skip }: PaginatedConfig): Promise<User[]> {
    const users = await this.repository.find({
      relations: ['social_networks'],
      where: {
        name: Like(`%${search}%`),
      },
      take: limit,
      skip,
    });

    return users;
  }

  public async getUserById(id: User['id']): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['social_networks', 'posts'],
    });

    if (!user) {
      throw new NotFoundError(`user with id ${id} not found`);
    }

    return user;
  }

  public async getUserByAuthId(authId: User['authId']): Promise<User> {
    const user = await this.repository.findOne({
      where: { authId },
      relations: ['social_networks'],
    });

    if (!user) {
      throw new NotFoundError(`user not found`);
    }

    return user;
  }

  public async updateUser(authId: User['authId'], user: UserPut): Promise<User> {
    const results = await this.repository.update(
      { authId },
      {
        avatar: user.avatar,
        job: user.job,
        location: user.location,
        name: user.name,
        role: user.role,
      },
    );
    return results.raw;
  }

  public async deleteUser(id: User['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const userRepository = new UserRopository();
