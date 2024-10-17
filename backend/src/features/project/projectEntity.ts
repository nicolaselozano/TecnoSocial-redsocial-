import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ type: 'varchar' })
  url: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => User)
  @JoinTable()
  liked_users: User[];
}
