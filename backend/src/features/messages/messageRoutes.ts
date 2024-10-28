/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { createMessage, getMessagesBetweenUsers, getMessagesByUser } from './messageController';
import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';

const { CheckToken } = MiddlewareAuth0;
const messageRouter = Router();

messageRouter.post('/messages', CheckToken, createMessage);
messageRouter.get('/messages', CheckToken, getMessagesByUser);
messageRouter.get('/messages/between/:receiverId', CheckToken, getMessagesBetweenUsers);

export default messageRouter;
