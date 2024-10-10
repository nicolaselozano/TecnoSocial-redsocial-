import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../post/postEntity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({type :"integer"})
  user_id: number;

  @Column({type :"integer"})
  post_id: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;
}
