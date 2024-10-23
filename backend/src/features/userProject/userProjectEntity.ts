import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project/projectEntity';
import { User } from '../user/userEntity';

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToOne(() => Project, (project) => project.users)
  project: Project;

  @Column({ type: 'varchar', length: 100 })
  role: string;
}
