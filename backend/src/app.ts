import express from "express";
import { setupSwagger } from "./config/swagger";
import userRoutes from "./features/user/routes/userRoutes";
import authUserRoutes from "./features/auth_user/routes/authUserRoutes";
import cookie_parser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.use(cookie_parser());
app.use(express.json());

// Rutas

//Ruta para el recurso de usuario
app.use("/api/v1", userRoutes,authUserRoutes);


// Inicializa Swagger
setupSwagger(app);

export default app;
