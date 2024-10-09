import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from "typeorm";
import { User } from "../user/userEntity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar",length:100})
  name: string;

  @Column({type:"varchar"})
    description: string

  @Column({type:"varchar"})
    role: string;

  @Column({type: "varchar"})
  url: string;

  @CreateDateColumn({type: "datetime" })
    create_at: string;

  @Column({type: "varchar"})
    collaborators: string 

  @ManyToMany(() => User)
    projects: Project[];
}