import con from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { User } from '../user/userEntity';
import { Project } from './projectEntity';

class ProjectRepository {
  private repository = con.getRepository(Project);

  public async createProject(project: Project): Promise<Project> {
    const response = await this.repository.save(project);
    return response;
  }

  public async getAllProjects(): Promise<Project[]> {
    const projects = await this.repository.find();
    return projects;
  }

  public async getProjectById(id: number): Promise<Project> {
    const project = await this.repository.findOneBy({ id: id });

    if (!project) {
      throw new NotFoundError(`Project with id ${id} not found`);
    }

    return project;
  }

  public async updateProject(id: number, project: Project): Promise<Project> {
    await this.repository.update(id, project);
    return project;
  }

  public async deleteProject(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async getProjectsLikedByUser(userid: User['id']): Promise<Project[]> {
    const projects = await this.repository.find({
      where: {
        liked_users: {
          id: userid,
        },
      },
      relations: ['liked_users'],
    });

    return projects;
  }
}

export const projectRepository = new ProjectRepository();
