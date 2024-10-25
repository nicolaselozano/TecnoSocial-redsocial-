/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { createMessage, getMessagesBetweenUsers, getMessagesByUser } from './messageController';

const messageRouter = Router();

messageRouter.post('/messages', createMessage);
messageRouter.get('/messages/:userId', getMessagesByUser);
messageRouter.get('/messages/between/:receiverId', getMessagesBetweenUsers);


export default messageRouter;