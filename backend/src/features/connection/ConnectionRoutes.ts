/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { connectionController } from './ConnectionController';

const { CheckToken } = MiddlewareAuth0;
const connectionRouter = Router();

connectionRouter.post('/follow/:id',CheckToken, connectionController.createConnectionController);

export default connectionRouter;