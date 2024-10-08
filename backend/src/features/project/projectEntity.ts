import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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
}