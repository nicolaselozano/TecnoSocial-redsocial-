import con from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { User } from './userEntity';

class UserRopository {
  private repository = con.getRepository(User);

  public async createUser(user: User): Promise<User> {
    const response = await this.repository.save(user);
    console.log(response);

    return response;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ['social_networks'],
    });
    console.log(users);

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

  public async updateUser(id: User['id'], user: User): Promise<User> {
    await this.repository.update(id, user);
    return user;
  }

  public async deleteUser(id: User['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async findUsersByRole(role: string): Promise<User[]> {
    const users = await this.repository.find({
      where: { role },
      relations: ['social_networks'],
    });
    
    return users;
  }
}

export const userRepository = new UserRopository();
