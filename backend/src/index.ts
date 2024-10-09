import cookieParser from "cookie-parser";
import express from "express";
import "express-async-errors";

import con from "./config/database";
import envs from "./config/envs";
import { swaggerSpecs, swaggerUi } from "./config/swagger";
import authUserRoutes from "./features/auth_user/routes/authUserRoutes";
import postRouter from "./features/post/postRoutes";
import projectRouter from "./features/project/projectRoutes";
import technologyRouter from "./features/technology/technologyRoutes";
import userRouter from "./features/user/userRoutes";
import { globalErrors } from "./middlewares/GlobalErrors";
import { setBaseMiddlewares } from "./middlewares/SetBaseMiddlewares";
import { healthcheck } from "./utils/healthcheck";
import commentRouter from "./features/comment/commentRoutes";

const app = express();


setBaseMiddlewares(app);

app.use("/health", healthcheck);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/v1", userRouter, authUserRoutes, projectRouter, postRouter, technologyRouter,commentRouter);

app.use(globalErrors);

con
  .initialize()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(envs.PORT, () => {
      console.log(` Servidor corriendo en ${envs.URL}:${envs.PORT}`);
      console.log(
        ` Documentación disponible en ${envs.URL}:${envs.PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
