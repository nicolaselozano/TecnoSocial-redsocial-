import con from '@/config/database';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { Role } from '../role/roleEntity';
import { User } from './userEntity';

type UserPut = Pick<User, 'avatar' | 'location' | 'name' | 'job'>;

type UserFilters = {
  role?: string;
};

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

  public async getAllUsersCount({ search }: PaginatedConfig & UserFilters): Promise<number> {
    return await this.repository.count({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  public async getAllUsers({ limit, search, skip }: PaginatedConfig & UserFilters) {
    const users = await this.repository.find({
      relations: ['social_networks', 'roles'],
      where: {
        name: Like(`%${search}%`),
      },
      take: limit,
      skip,
    });

    // Remove id from role object
    return users.map((user) => ({
      ...user,
      roles: user.roles.map((r) => r.name),
    }));
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

  public async getUserByEmail(email: User['email']): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['social_networks'],
    });

    if (!user) {
      throw new NotFoundError(`user with email ${email} not found`);
    }

    return user;
  }

  public async getUserByAuthId(authId: User['authId']): Promise<User> {
    console.log(authId);

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
      },
    );
    return results.raw;
  }

  public async deleteUser(id: User['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async getAllUsersByRole(role: Role['name']) {
    const users = await this.repository.find({
      where: {
        roles: { name: Like(`${role}`) },
      },
      relations: ['roles'],
    });

    return users.map((user) => ({
      ...user,
      roles: user.roles.map((r) => r.name),
    }));
  }
}

export const userRepository = new UserRopository();
