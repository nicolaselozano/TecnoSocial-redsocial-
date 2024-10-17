import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followed)
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  followed: User;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
