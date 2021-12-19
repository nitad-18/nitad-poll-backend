import { Poll } from 'src/poll/entities/poll.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PollOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => Poll, poll => poll.options)
  poll: Poll;

  @CreateDateColumn({ name: 'created_date', select: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', select: false })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'deleted_date', select: false })
  deletedDate: Date;

  constructor(partial: Partial<PollOption>) {
    Object.assign(this, partial);
  }
}
