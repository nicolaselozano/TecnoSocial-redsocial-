import chalk from 'chalk';
import express from 'express';
import 'express-async-errors';
import http from 'http';
import path from 'path';
import con from './config/database';
import envs from './config/envs';
import { swaggerSpecs, swaggerUi } from './config/swagger';
import authUserRoutes from './features/auth_user/routes/authUserRoutes';
import commentRouter from './features/comment/commentRoutes';
import imageRouter from './features/image/imageRoutes';
import likeRouter from './features/like/likeRoutes';
import messageRouter from './features/messages/messageRoutes';
import notificationRouter from './features/notification/notificationRoutes';
import postRouter from './features/post/postRoutes';
import projectRouter from './features/project/projectRoutes';
import { roleRouter } from './features/role/roleRouter';
import socialNetworksRouter from './features/social_networks/socialNetworksRoutes';
import technologyRouter from './features/technology/technologyRoutes';
import userRouter from './features/user/userRoutes';
import { globalErrors } from './middlewares/GlobalErrors';
import { setBaseMiddlewares } from './middlewares/SetBaseMiddlewares';
import fuRouter from './services/fileupload/fleuploadRutes';
import { initializeMSocketIO } from './socket/socketMessage';
import { healthcheck } from './utils/healthcheck';
import { redirectToDocs } from './utils/redirectToDocs';
import connectionRouter from './features/connection/ConnectionRoutes';

export const app = express();
const server = http.createServer(app);

// Ruta para verificar la conexión de Socket.IO
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/socket.io-client/dist/socket.io.js'));
});

setBaseMiddlewares(app);

app.get('/api', redirectToDocs);
app.use('/api/health', healthcheck);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(
  '/api/v1',
  userRouter,
  authUserRoutes,
  projectRouter,
  postRouter,
  technologyRouter,
  imageRouter,
  socialNetworksRouter,
  commentRouter,
  likeRouter,
  fuRouter,
  notificationRouter,
  messageRouter,
  connectionRouter,
  roleRouter,
);

app.use('/uploads', express.static(path.join('./', envs.UPLOAD_DIR)));

app.use(globalErrors);
// Inicializa Socket.IO

initializeMSocketIO(server);
// Cambia a `server.listen` para que Socket.IO funcione correctamente
export function start() {
  con
    .initialize()
    .then(() => {
      console.log('Conexión a la base de datos exitosa');
      server.listen(envs.PORT, () => {
        console.log(chalk.blue(`🚀 -- Servidor corriendo en ${envs.URL}:${envs.PORT}`));
        console.log(chalk.green(`📝 -- Documentación disponible en ${envs.URL}:${envs.PORT}/api/docs`));
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
