import { Request, Response } from 'express';
import { userRepository } from './userRepository';

class SimilarProfilesController {
  public getSimilarProfiles = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const user = await userRepository.getUserById(Number(userId));

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const similarProfiles = await userRepository.findUsersByRole(user.role);

      const filteredProfiles = similarProfiles.filter((profile) => profile.id !== user.id);

      if (filteredProfiles.length === 0) {
        return res.status(204).send();
      }

      return res.json(filteredProfiles);
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor', error });
    }
  };
}

export const similarProfilesController = new SimilarProfilesController();
