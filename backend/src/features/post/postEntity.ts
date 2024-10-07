import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/emtities/userEntity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  title: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;
}
