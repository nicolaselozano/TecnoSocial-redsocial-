import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/postEntity';
import { User } from '../user/userEntity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
