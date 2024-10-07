import { DataSource } from "typeorm";
import envs from "./envs";
import { User } from "../features/user/emtities/userEntity";

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
