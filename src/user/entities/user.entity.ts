import { Poll } from 'src/poll/entities/poll.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @OneToMany(() => Poll, poll => poll.author)
  polls: Poll[];

  @ManyToMany(() => Poll, poll => poll.users)
  votedPolls: Poll[];

  @CreateDateColumn({ name: 'created_date', select: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', select: false })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'deleted_date', select: false })
  deletedDate: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
