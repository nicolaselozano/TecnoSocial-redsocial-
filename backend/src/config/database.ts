import { DataSource } from 'typeorm';
import envs from './envs';

import { Post } from '../features/post/postEntity';
import { Project } from '../features/project/projectEntity';
import { Technology } from '../features/technology/technologyEntity';
import { User } from '../features/user/userEntity';

const con = new DataSource({
  type: 'mysql',
  driver: require('mysql2'),
  host: envs.DB.HOST,
  port: envs.DB.PORT,
  username: envs.DB.USER,
  password: envs.DB.PASS,
  database: envs.DB.NAME,
  synchronize: true,
  entities: [User, Post, Project, Technology],
});

export default con;
