import { DataSource } from 'typeorm';
import envs from './envs';

import { Comment } from '@/features/comment/commentEntity';
import { Image } from '@/features/image/imageEntity';
import { Like } from '@/features/like/likeEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
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
  entities: [User, Post, SocialNetworks, Project, Image, Technology, Like, Comment],
});

export default con;
