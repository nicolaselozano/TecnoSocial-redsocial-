import express from "express";
import con from "./config/database";
import userRouter from "./features/user/userRoutes";
const { swaggerUi, swaggerSpecs } = require("./config/swagger");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 3000;
const URL = process.env.SERVER_URL || "http://localhost";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api", userRouter);

con
  .initialize()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en ${URL}:${PORT}`);
      console.log(` Documentación disponible en ${URL}:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
