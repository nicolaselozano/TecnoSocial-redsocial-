import { Post } from '@/features/post/postEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/commentEntity';
import { Connection } from '../connection/ConnectionEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToOne(() => SocialNetworks, { cascade: true })
  @JoinColumn()
  social_networks: SocialNetworks;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Connection, (connection) => connection.follower)
  following: Connection[];

  @OneToMany(() => Connection, (connection) => connection.following)
  followers: Connection[];
}
