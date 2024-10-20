import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocialNetworks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  github: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  gitlab: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  twitter: string;
}
