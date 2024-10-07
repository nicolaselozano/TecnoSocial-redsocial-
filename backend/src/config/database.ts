import { DataSource } from "typeorm";
import { User } from "../features/user/emtities/userEntity";
require("dotenv").config();

const con = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});

export default con;
