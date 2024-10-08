import con from "../../config/database";
import { Project } from "./projectEntity";

class ProjectRepository {
  private repository = con.getRepository(Project);

  // Crear un proyecto
  public async createRepository(project: Project): Promise<Project> {
    const response = await this.repository.save(project);
    console.log(response);

    return response;
  }

  // Obtener todos los proyectos
  public async getAllProjects(): Promise<Project[]> {
    const projects = await this.repository.find();
    console.log(projects);

    return projects;
  }

  // Obtener un proyecto por id
  public async getProjectById(id: number): Promise<Project> {
    console.log(id);

    const project = await this.repository.findOneBy({ id: id });
    console.log(project);
    return project;
  }

  // Actualizar un proyecto
  public async updateProject(id: number, project: Project): Promise<Project> {
    await this.repository.update(id, project);
    return project;
  }

  // Eliminar un proyecto
  public async deleteProject(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const projectRepository = new ProjectRepository();