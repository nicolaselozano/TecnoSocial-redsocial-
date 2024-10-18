import con from '@/config/database';
import { Project } from '../project/projectEntity';
import { User } from '../user/userEntity';
import { UserProject } from './userProjectEntity';

class UserProjectRepository {
  private repository = con.getRepository(UserProject);

  public async getAllProjectsByUser(userid: User['id']): Promise<Project[]> {
    const results = await this.repository.find({
      where: {
        user: {
          id: userid,
        },
      },
      relations: ['project'],
    });

    return results.map((res) => res.project);
  }
}

export const userProjectRepository = new UserProjectRepository();
