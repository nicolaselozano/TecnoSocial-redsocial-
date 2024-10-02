import express from "express";
import { setupSwagger } from "./config/swagger";
import userRoutes from "./features/user/routes/userRoutes";

const app = express();

app.use(express.json());

// Rutas
app.use("/api/v1", userRoutes);

// Inicializa Swagger
setupSwagger(app);

export default app;
