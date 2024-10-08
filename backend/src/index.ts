import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import con from "./config/database";
import envs from "./config/envs";
import { swaggerSpecs, swaggerUi } from "./config/swagger";
import authUserRoutes from "./features/auth_user/routes/authUserRoutes";
import postRouter from "./features/post/postRoutes";
import projectRouter from "./features/project/projectRoutes";
import technologyRouter from "./features/technology/technologyRoutes";
import userRouter from "./features/user/userRoutes";
import { healthcheck } from "./utils/healthcheck";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      //permite cualquier origen
      callback(null, origin || "*");
    },
    credentials: true,
  })
);

app.use("/health", healthcheck);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(
  "/api/v1",
  userRouter,
  authUserRoutes,
  projectRouter,
  postRouter,
  technologyRouter
);

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
