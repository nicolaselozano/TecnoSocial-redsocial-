import express from "express";
import con from "./config/database";
import envs from "./config/envs";
import userRouter from "./features/user/userRoutes";
const { swaggerUi, swaggerSpecs } = require("./config/swagger");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api", userRouter);

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
