import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/postEntity';
import { User } from '../user/userEntity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
