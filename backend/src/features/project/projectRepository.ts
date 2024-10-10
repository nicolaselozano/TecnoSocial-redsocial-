import { NotFoundError } from '@/utils/errors';
import con from '@/config/database';
import { Project } from './projectEntity';

class ProjectRepository {
  private repository = con.getRepository(Project);

  public async createProject(project: Project): Promise<Project> {
    const response = await this.repository.save(project);
    return response;
  }

  public async getAllProjects(): Promise<Project[]> {
    const projects = await this.repository.find();
    console.log(projects);

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
}

export const projectRepository = new ProjectRepository();
