import { DataSource } from "typeorm";
import { User } from "../features/user/userEntity";
import envs from "./envs";

const con = new DataSource({
  type: "mysql",
  host: envs.DB.HOST,
  port: envs.DB.PORT,
  username: envs.DB.USER,
  password: envs.DB.PASS,
  database: envs.DB.NAME,
  synchronize: true,
  entities: [User],
});

export default con;
