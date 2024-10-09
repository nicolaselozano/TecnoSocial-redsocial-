import { UserDataToken } from "@/middlewares/Auth/interface/UserDataToken";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const CreateUserAuthC = (req: Request, res: Response): void => {
  console.log("Creando el usuario desde Auth0");

  try {
    const userData: UserDataToken = res.locals["userData"];
    console.log("USER DATA: " + JSON.stringify(userData));

    if (!userData) {
      throw new Error("No se encontró información del usuario");
    }

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userData,
    });
  } catch (error: any) {
    console.error("Error al crear el usuario: ", error.message);
    res.status(500).json({
      error: "Error al crear el usuario",
      message: error.message || "Error desconocido",
    });
  }
};

const GetAuthenticatedUser = (req: Request, res: Response): void => {
  try {
    const userData: UserDataToken = res.locals["userData"];

    if (req.query.clearCookies === "true") {
      const cookies = req.cookies;
      for (const cookieName in cookies) {
        res.clearCookie(cookieName);
      }
    }

    if (userData.email) {
      res.status(200).json({
        user: userData.authName,
        email: userData.email,
        authId: userData.authId,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "No estás autenticado" });
  }
};

export const authUserController = {
  CreateUserAuthC,
  GetAuthenticatedUser,
};
