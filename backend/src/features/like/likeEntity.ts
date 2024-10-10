import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';
import { Post } from '../post/postEntity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  user_id: User;

  @Column({ type: 'varchar', length: 100 })
  post_id: Post;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

}
