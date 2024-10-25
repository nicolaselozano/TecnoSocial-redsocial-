/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { messageRepository } from './messageRepository';
import { userRepository } from '../user/userRepository';
import { Message } from './messageEntity';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';

export const getMessagesBetweenUsers = async (req: Request, res: Response): Promise<void> => {
    const userData: UserDataToken | undefined = res.locals['userData'];
    if (!userData?.authId) throw Error("No se autentico");
    
    const { receiverId } = req.params;

    try {
        const sender = await userRepository.getUserByAuthId(userData.authId);
        const receiver = await userRepository.getUserByAuthId(receiverId);

        if (!sender || !receiver) {
            res.status(404).json({ message: 'Sender or Receiver not found' });
            return;
        }

        const messages = await messageRepository.find({
            where: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ],
            relations: ['sender', 'receiver'],
            order: { createdAt: 'ASC' }
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    const userData: UserDataToken | undefined = res.locals['userData'];
    if(!userData?.authId) throw Error("No se autentico");
    const { content, receiverId } = req.body;

    try {
        const sender = await userRepository.getUserByAuthId(userData?.authId);
        const receiver = await userRepository.getUserByAuthId(receiverId);

        if (!sender || !receiver) {
            res.status(404).json({ message: 'Sender or Receiver not found' });
            return;  // Importante para finalizar la ejecución de la función
        }

        const newMessage = new Message();
        newMessage.content = content;
        newMessage.sender = sender;
        newMessage.receiver = receiver;

        await messageRepository.save(newMessage);

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
};

export const getMessagesByUser = async (req: Request, res: Response): Promise<void> => {
    const userData: UserDataToken | undefined = res.locals['userData'];
    if(!userData?.authId) throw Error("No se autentico");
    const { userId } = req.params;

    try {
        const user = await userRepository.getUserByAuthId(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const sentMessages = await messageRepository.find({
            where: { sender: user },
            relations: ['receiver'],
        });

        const receivedMessages = await messageRepository.find({
            where: { receiver: user },
            relations: ['sender'],
        });

        res.json({
            sentMessages,
            receivedMessages
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};
