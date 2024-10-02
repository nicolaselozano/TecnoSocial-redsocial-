import { User } from "../models/userModel";
import pool from "../../../config/database";

export const userRepository = {
  findAll: async (): Promise<User[]> => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as User[];
  },

  findById: async (id: string): Promise<User | undefined> => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    const users = rows as User[];
    return users.length ? users[0] : undefined;
  },

  create: async (user: User): Promise<User> => {
    const { id, name, email, password } = user;
    await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, name, email, password]
    );
    return user;
  },

  update: async (
    id: string,
    updatedUser: Partial<User>
  ): Promise<User | undefined> => {
    const { name, email, password } = updatedUser;
    await pool.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id]
    );
    const updated = await userRepository.findById(id);
    return updated;
  },

  delete: async (id: string): Promise<boolean> => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  },
};
