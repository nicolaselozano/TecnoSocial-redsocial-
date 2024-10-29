import { User } from '../user/userEntity';
import { Post } from './postEntity';

export type PostInsert = Pick<Post, 'title' | 'content'> & { user: User } & { technologies: string[] };
export type PostPut = Partial<Pick<Post, 'title' | 'technologies' | 'content' | 'images'>>;
export type PostDelete = Post['id'];
export type PostSelect = Post['id'];
