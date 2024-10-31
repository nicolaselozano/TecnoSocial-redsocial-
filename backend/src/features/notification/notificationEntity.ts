import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/postEntity';
import { User } from '../user/userEntity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 150 })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'boolean', default: false })
  soft_delete: boolean;

  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
