import { User } from "../models/userModel";
import { userRepository } from "../repositories/userRepository";
import { v4 as uuidv4 } from "uuid";

export const userService = {
  getAllUsers: async (): Promise<User[]> => userRepository.findAll(),

  getUserById: async (id: string): Promise<User | undefined> =>
    userRepository.findById(id),

  createUser: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      password,
    };
    return userRepository.create(newUser);
  },

  updateUser: async (
    id: string,
    updatedData: Partial<User>
  ): Promise<User | undefined> => userRepository.update(id, updatedData),

  deleteUser: async (id: string): Promise<boolean> => userRepository.delete(id),
};
