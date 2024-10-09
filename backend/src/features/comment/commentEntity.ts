import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    content: string;
  
    @Column()
    user_id: number;
  
    @Column()
    post_id: number;
  
    @CreateDateColumn({ type: "datetime" })
    created_at: Date;

      
  }