import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { User } from '../user/userEntity';
import { Connection } from './ConnectionEntity';

type ConnectionPaginatedConfig = PaginatedConfig & {
  userid: User['id'];
  authId?: string; 
};

class ConnectionRepository {
  private repository = con.getRepository(Connection);

  // Usuarios que siguen al usuario cliente
  async getAllFollowers({ limit, userid, search, skip }: ConnectionPaginatedConfig) {
    const results = await this.repository.find({
      where: {
        followed: { id: userid },
        follower: {
          name: Like(`%${search}%`),
        },
      },
      relations: ['follower'],
      take: limit,
      skip,
    });

    return results.map((res) => res.follower);
  }

  // Usuarios al que el usuario sigue
  async getAllFollowed({ limit, userid, search, skip }: ConnectionPaginatedConfig) {
    const results = await this.repository.find({
      where: {
        follower: { id: userid },
        followed: { name: Like(`%${search}%`) },
      },
      relations: ['followed'],
      take: limit,
      skip,
    });
  
    return results.map((res) => ({
      id: res.followed.id,
      name: res.followed.name,
      authId: res.followed.authId,
      avatar: res.followed.avatar,
    }));
  }
  
  async getFollowersCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      where: {
        followed: { id: userid },
        follower: {
          name: Like(`%${search}%`),
        },
      },
    });

    console.log({ count });

    return count;
  }

  async getFollowedCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
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

  async getFollowedConnection(followedid: User['id'], clientUser: User['email']): Promise<Connection> {
    const result = await this.repository.findOne({
      where: {
        followed: {
          id: followedid,
        },
        follower: {
          email: clientUser,
        },
      },
    });

    if (!result) {
      throw new NotFoundError('Connection not found');
    }

    return result;
  }

  async deleteConnection(id: Connection['id']) {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async isFollower(followedid: User['id'], followerid: User['id']) {
    const result = await this.repository.count({
      where: {
        followed: { id: followedid },
        follower: { id: followerid },
      },
    });
    return result === 1;
  }
}

export const connectionRepository = new ConnectionRepository();
