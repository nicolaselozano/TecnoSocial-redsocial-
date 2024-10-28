/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { MessageService } from './messageRepository';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';

export const getMessagesBetweenUsers = async (req: Request, res: Response): Promise<void> => {
  const userData: UserDataToken | undefined = res.locals['userData'];
  if (!userData?.authId) {
    res.status(401).json({ message: 'No se autentico' });
    return;
  }

  const { receiverId } = req.params;
  const { limit = 10, skip = 0 } = req.query;

  try {
    const messages = await MessageService.getMessagesBetweenUsers(
      userData.authId,
      receiverId,
      Number(limit),
      Number(skip),
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const userData: UserDataToken | undefined = res.locals['userData'];
  if (!userData?.authId) {
    res.status(401).json({ message: 'No se autentico' });
    return;
  }
  const { content, receiverId } = req.body;

  try {
    const newMessage = await MessageService.createMessage(userData.authId, receiverId, content);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error });
  }
};

export const getMessagesByUser = async (req: Request, res: Response): Promise<void> => {
  const userData: UserDataToken | undefined = res.locals['userData'];

  if (!userData?.authId) {
    res.status(401).json({ message: 'No se autentico' });
    return;
  }

  const limit = Math.max(1, parseInt(req.query.limit as string, 10) || 10);
  const skip = Math.max(0, parseInt(req.query.skip as string, 10) || 0);

  try {
    const messages = await MessageService.getMessagesByUser(userData.authId, limit, skip);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
