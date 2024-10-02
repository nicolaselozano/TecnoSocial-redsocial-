import { Request, Response } from "express";
import { userService } from "../services/userService";

/**
 * Obtiene todos los usuarios
 */
export const getAllUsers = (req: Request, res: Response): void => {
  console.log("Obtener todos los usuarios");

  const users = userService.getAllUsers();
  res.json(users);
};

/**
 * Obtiene un usuario por ID
 */
export const getUserById = (req: Request, res: Response): void => {
  console.log("Obtener usuario por ID");

  const user = userService.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

/**
 * Crea un nuevo usuario
 */
export const createUser = (req: Request, res: Response): void => {
  console.log("Crear usuario");

  const { name, email, password } = req.body;
  const newUser = userService.createUser(name, email, password);
  res.status(201).json(newUser);
};

/**
 * Actualiza un usuario
 */
export const updateUser = (req: Request, res: Response): void => {
  console.log("Actualizar usuario");
  const updatedUser = userService.updateUser(req.params.id, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

/**
 * Elimina un usuario
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Eliminar usuario");

  const deleted = await userService.deleteUser(req.params.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};
