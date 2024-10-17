import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';
import { UserProject } from '../userProject/userProjectEntity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  url: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  users: UserProject[];

  @ManyToMany(() => User)
  @JoinTable()
  liked_users: User[];
}
