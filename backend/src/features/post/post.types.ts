import { User } from '../user/userEntity';
import { Post } from './postEntity';

export type PostInsert = Pick<Post, 'title' | 'technologies' | 'content'> & { user: User };
export type PostPut = Partial<Pick<Post, 'title' | 'technologies' | 'content' | 'images'>>;
export type PostDelete = Post['id'];
export type PostSelect = Post['id'];
