import { Request, Response } from "express";
import { projectRepository } from "./projectRepository"; 
import { Project } from "./projectEntity";



class ProjectController {
  public async createProject(req: Request, res: Response): Promise<void> {
    const { name, role, description, url, collaborators } = req.body;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.role = role;
    project.url = url;
    project.collaborators = collaborators;
    

    const response = await projectRepository.createProject(project);
    res.json(response);
  }

  public async getAllProjects(req: Request, res: Response): Promise<void> {
    const projects = await projectRepository.getAllProjects();
    res.json(projects);
  }

  public async getProjectById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const project = await projectRepository.getProjectById(Number(id));
    res.json(project);
  }

  public async updateProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, role, description, url, collaborators } = req.body;

    const updatedProject = new Project();
    updatedProject.name = name;
    updatedProject.description = description;
    updatedProject.role = role;
    updatedProject.url = url;
    updatedProject.collaborators = collaborators;

    const response = await projectRepository.updateProject(Number(id), updatedProject);
    res.json(response);
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await projectRepository.deleteProject(Number(id));
    res.json(response);
  }
}

export const projectController = new ProjectController();
