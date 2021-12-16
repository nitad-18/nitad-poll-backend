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

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;
}
