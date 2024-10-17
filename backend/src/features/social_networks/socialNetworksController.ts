import { ResponseWithUserData } from '@/types/ResponseWithUserData.type';
import { getSocialNetworksPutData } from '@/utils/getSocialNetworksPutData';
import { Request } from 'express';
import { userRepository } from '../user/userRepository';
import { socialNetworksRepository } from './socialNetworksRepository';

class SocialNetworksController {
  async update(req: Request, res: ResponseWithUserData) {
    const { authId } = res.locals.userData!;
    const user = await userRepository.getUserByAuthId(authId);
    const updatedSocialNetworks = getSocialNetworksPutData(req.body);
    const result = await socialNetworksRepository.update(user.social_networks.id, updatedSocialNetworks);

    if (!result) {
      res.status(400).json({
        message: 'hubo un error al modificar las redes sociales del usuario',
      });
    }

    res.status(201).json({
      message: 'redes sociales modificadas exitosamente',
    });
  }
}

export const socialNetworkController = new SocialNetworksController();
