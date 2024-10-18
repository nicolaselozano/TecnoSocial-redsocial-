import { Request, Response } from 'express';
import { userProjectRepository } from '../userProject/userProjectRepository';
import { Project } from './projectEntity';
import { projectRepository } from './projectRepository';

class ProjectController {
  public async createProject(req: Request, res: Response): Promise<void> {
    const { name, description, url } = req.body;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.url = url;

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
    const { name, description, url } = req.body;

    const updatedProject = new Project();
    updatedProject.name = name;
    updatedProject.description = description;
    updatedProject.url = url;

    const response = await projectRepository.updateProject(Number(id), updatedProject);
    res.json(response);
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await projectRepository.deleteProject(Number(id));
    res.json(response);
  }

  public async getAllProjectsLikedByUser(req: Request, res: Response): Promise<void> {
    const { userid } = req.params;
    const projects = await projectRepository.getProjectsLikedByUser(Number(userid));
    res.json({ projects });
  }

  public async getAllProjectsByUser(req: Request, res: Response): Promise<void> {
    const { userid } = req.params;
    const projects = await userProjectRepository.getAllProjectsByUser(Number(userid));
    res.json({ projects });
  }
}

export const projectController = new ProjectController();
