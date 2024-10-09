import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column()
  user: number;

  @Column()
  post_id: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
