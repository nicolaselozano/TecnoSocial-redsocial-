import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Image } from "../image/imageEntity";
import { Technology } from "../technology/technologyEntity";
import { User } from "../user/userEntity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  content: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;


  @OneToMany(() => Image, (image) => image.post_id)
  images: Image[];
  
  @ManyToMany(() => Technology, (label) => label.name)
  @JoinTable()
  labels: Technology[];
}
