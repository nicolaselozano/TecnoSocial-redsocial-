import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project/projectEntity';

@Entity()
export class ImageProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  url: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;
}
