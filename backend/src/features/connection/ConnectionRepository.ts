import con from '@/config/database';
import { User } from '../user/userEntity';
import { Connection } from './ConnectionEntity';

class ConnectionRepository {
  private repository = con.getRepository(Connection);

  // Usuarios que siguen al usuario cliente
  async getAllFollowers(id: User['id']) {
    const results = await this.repository.find({
      where: {
        follower: { id },
      },
      relations: ['following'],
    });

    return results.map((res) => res.following);
  }

  // Usuarios al que el usuario sigue
  async getAllFollowings(id: User['id']) {
    const results = await this.repository.find({
      where: {
        following: { id },
      },
      relations: ['follower'],
    });

    return results.map((res) => res.follower);
  }
}

export const connectionRepository = new ConnectionRepository();
