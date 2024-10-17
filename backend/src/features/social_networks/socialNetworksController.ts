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
    res.json(result);
  }
}

export const socialNetworkController = new SocialNetworksController();
