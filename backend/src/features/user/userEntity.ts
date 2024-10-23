import { Post } from '@/features/post/postEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
import { ITRole } from '@/types/roles.enum';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/commentEntity';
import { Connection } from '../connection/ConnectionEntity';
import { UserProject } from '../userProject/userProjectEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  authId: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  authName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  token: string;

  @Column({ type: 'enum', enum: ITRole, nullable: true })
  role: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  job: string;

  @OneToOne(() => SocialNetworks, { cascade: true })
  @JoinColumn()
  social_networks: SocialNetworks;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Connection, (connection) => connection.follower)
  followed: Connection[];

  @OneToMany(() => Connection, (connection) => connection.followed)
  followers: Connection[];

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  projects: UserProject[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;
}
