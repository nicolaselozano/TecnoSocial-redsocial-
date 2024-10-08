import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../post/postEntity";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  url: string;

  @Column({ type: "varchar", length: 100 })
  alt: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @ManyToOne(() => Post, (post) => post.id)
  post_id: Post;
}
