import { Image } from '@/features/image/imageEntity';
import { Technology } from '@/features/technology/technologyEntity';
import { User } from '@/features/user/userEntity';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/commentEntity';
import { Like } from '../like/likeEntity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Length(5, 250, { message: 'el contenido del post debe tener un largo determinado (5 min, 250 max)' })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  @Length(5, 150, { message: 'el titulo del post debe tener un largo determinado (5 min, 150 max)' })
  title: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Image, (image) => image.post_id, {
    cascade: true,
  })
  images: Image[];

  @ManyToMany(() => Technology, (label) => label.name)
  @JoinTable()
  technologies: Technology[];

  @OneToMany(() => Like, (like) => like.user, {
    cascade: true,
  })
  likes: Like;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment;
}
