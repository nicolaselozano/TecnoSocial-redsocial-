/* eslint-disable prettier/prettier */
import con from '../../config/database'; // Asegúrate de importar correctamente tu conexión a la base de datos
import { userRepository } from '../user/userRepository';
import { Message } from './messageEntity';

export const messageRepository = con.getRepository(Message);

export const MessageService = {
    async getMessagesBetweenUsers(authId: string, receiverId: string, limit: number = 10, skip: number = 0) {
        const sender = await userRepository.getUserByAuthId(authId);
        const receiver = await userRepository.getUserByAuthId(receiverId);

        if (!sender || !receiver) {
            throw new Error('Sender or Receiver not found');
        }

        return await messageRepository.find({
            where: [
                { sender: { id: sender.id }, receiver: { id: receiver.id } },
                { sender: { id: receiver.id }, receiver: { id: sender.id } }
            ],
            relations: ['sender', 'receiver'],
            order: { createdAt: 'ASC' },
            take: limit,
            skip: skip
        });
    },

    async createMessage(authId: string, receiverId: string, content: string) {
        const sender = await userRepository.getUserByAuthId(authId);
        const receiver = await userRepository.getUserByAuthId(receiverId);

        if (!sender || !receiver) {
            throw new Error('Sender or Receiver not found');
        }

        const newMessage = new Message();
        newMessage.content = content;
        newMessage.sender = sender;
        newMessage.receiver = receiver;

        return messageRepository.save(newMessage);
    },

    async getMessagesByUser(authId: string, limit: number, skip: number) {
        const user = await userRepository.getUserByAuthId(authId);

        if (!user) {
            throw new Error('User not found');
        }

        const [sentMessages, receivedMessages] = await Promise.all([
            messageRepository.find({
                where: { sender: { id: user.id } },
                relations: ['receiver'],
                take: limit,
                skip: skip
            }),
            messageRepository.find({
                where: { receiver: { id: user.id } },
                relations: ['sender'],
                take: limit,
                skip: skip
            })
        ]);

        return {
            sentMessages,
            receivedMessages
        };
    }
};
