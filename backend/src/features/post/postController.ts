import { Request, Response } from "express";
import { Post } from "./postEntity";
import { postRepository } from "./postRepository";

class PostController {
  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, content, user_id } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user_id = user_id;

    const response = await postRepository.createPost(post);
    res.json(response);
  }

  public async getAllPosts(req: Request, res: Response): Promise<void> {
    const users = await postRepository.getAllPosts();
    res.json(users);
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await postRepository.getPostById(id);
    res.json(user);
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user_id = user_id;

    const response = await postRepository.updatePost(id, post);
    res.json(response);
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await postRepository.deletePost(id);
    res.json(response);
  }
}

export const postController = new PostController();
