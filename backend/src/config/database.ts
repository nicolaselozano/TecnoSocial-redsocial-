import { DataSource } from 'typeorm';
import envs from './envs';

import { Comment } from '@/features/comment/commentEntity';
import { Connection } from '@/features/connection/ConnectionEntity';
import { Image } from '@/features/image/imageEntity';
import { Like } from '@/features/like/likeEntity';
import { Post } from '@/features/post/postEntity';
import { Project } from '@/features/project/projectEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
import { Technology } from '@/features/technology/technologyEntity';
import { User } from '@/features/user/userEntity';
import { UserProject } from '@/features/userProject/userProjectEntity';
import { ImageProject } from '@/features/projectImages/imageEntity';
import mysql2 from 'mysql2';

const con = new DataSource({
  type: 'mysql',
  driver: mysql2,
  host: envs.DB.HOST,
  port: envs.DB.PORT,
  username: envs.DB.USER,
  password: envs.DB.PASS,
  database: envs.DB.NAME,
  entities: [
    User,
    Post,
    SocialNetworks,
    Project,
    Image,
    Technology,
    Like,
    Comment,
    Connection,
    UserProject,
    ImageProject,
  ],
  synchronize: true,
});

export default con;
