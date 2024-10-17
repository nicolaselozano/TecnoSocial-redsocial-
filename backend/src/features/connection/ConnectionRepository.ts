import con from '@/config/database';
import { PaginatedConfig } from '@/types/paginatedConfig.type';
import { Like } from 'typeorm';
import { User } from '../user/userEntity';
import { Connection } from './ConnectionEntity';

type ConnectionPaginatedConfig = PaginatedConfig & {
  userid: User['id'];
};

class ConnectionRepository {
  private repository = con.getRepository(Connection);

  // Usuarios que siguen al usuario cliente
  async getAllFollowers(id: User['id']) {
    const results = await this.repository.find({
      where: {
        followed: { id },
      },
      relations: ['follower'],
    });

    return results.map((res) => res.follower);
  }

  // Usuarios al que el usuario sigue
  async getAllFollowed({ limit, userid, search, skip }: ConnectionPaginatedConfig) {
    const results = await this.repository.find({
      relations: ['followed'],
      take: limit,
      skip,
      where: {
        followed: {
          name: Like(`%${search}%`),
        },
        follower: { id: userid },
      },
    });

    return results.map((res) => res.followed);
  }

  async getFollowersCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      where: {
        followed: {
          name: Like(`%${search}%`),
        },
        follower: { id: userid },
      },
    });

    return count;
  }

  async getFollowedCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      where: {
        followed: { id: userid },
        follower: {
          name: Like(`%${search}%`),
        },
      },
    });

    return count;
  }
}

export const connectionRepository = new ConnectionRepository();
