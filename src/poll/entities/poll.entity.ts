import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ name: 'is_close', default: false })
  isClose: boolean;

  @Column({ name: 'closed_date', default: null, nullable: true })
  closedDate: Date;

  @ManyToOne(() => User, user => user.polls)
  author: User;

  @ManyToMany(() => User, user => user.votedPolls)
  @JoinTable()
  users: User[];

  @OneToMany(() => PollOption, pollOption => pollOption.poll)
  options: PollOption[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', select: false })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'deleted_date', select: false })
  deletedDate: Date;

  constructor(partial: Partial<Poll>) {
    Object.assign(this, partial);
  }
}
