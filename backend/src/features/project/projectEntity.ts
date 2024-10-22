import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';
import { ImageProject } from '../projectImages/imageEntity';
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

  @OneToMany(() => ImageProject, (image) => image.project)
  images: ImageProject[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  users: UserProject[];

  @ManyToMany(() => User)
  @JoinTable()
  liked_users: User[];
}
