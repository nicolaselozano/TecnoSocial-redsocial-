import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/userEntity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderAuthId', referencedColumnName: 'authId', foreignKeyConstraintName: 'FK_sender_authId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({
    name: 'receiverAuthId',
    referencedColumnName: 'authId',
    foreignKeyConstraintName: 'FK_receiver_authId',
  })
  receiver: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
