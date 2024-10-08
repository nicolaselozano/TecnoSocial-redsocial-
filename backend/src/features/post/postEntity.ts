import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Label } from "../label/labelEntity";
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

  @ManyToMany(() => Label, (label) => label.name)
  @JoinTable()
  labels: Label[];
}
