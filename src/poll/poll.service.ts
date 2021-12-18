import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { User } from 'src/user/entities/user.entity';
import { PollWithoutDeletedDate } from 'src/utilities/type';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
    @InjectRepository(PollOption) private pollOptionRepository: Repository<PollOption>,
  ) {}

  async create(createPollDto: CreatePollDto, user: User): Promise<PollWithoutDeletedDate> {
    const poll = await this.pollRepository.create(createPollDto);
    poll.author = user;
    const { deletedDate, ...result } = await this.pollRepository.save(poll);
    return result;
  }

  async findAll(): Promise<Poll[] | undefined> {
    return await this.pollRepository.find({ relations: ['author', 'users', 'options'] });
  }

  async findOne(pollId: number): Promise<Poll | undefined> {
    return await this.pollRepository.findOne(
      { id: pollId },
      { relations: ['author', 'users', 'options'] },
    );
  }

  async update(id: number, updatePollDto: UpdatePollDto): Promise<UpdateResult> {
    return await this.pollRepository.update(id, updatePollDto);
  }

  async updateEntity(poll: Poll, updatePollDto: UpdatePollDto): Promise<Poll> {
    poll.question = updatePollDto.question;
    return await this.pollRepository.save(poll);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.pollRepository.softDelete(id);
  }

  async vote(user: User, pollId: number, optionId: number): Promise<Poll | null> {
    const poll: Poll = await this.findOne(pollId);
    if (!poll) {
      return null;
    }

    if (poll.isClose) {
      return undefined;
    }

    for (const votedUser of poll.users) {
      if (votedUser.id === user.id) {
        return undefined;
      }
    }

    for (let i = 0; i < poll.options.length; i++) {
      if (poll.options[i].id === optionId) {
        poll.users.push(user);
        await this.pollRepository.save(poll);
        await this.pollOptionRepository.update(optionId, { votes: ++poll.options[i].votes });
        return poll;
      }
    }
    return null;
  }

  async close(poll: Poll): Promise<Poll | null> {
    poll.isClose = true;
    return await this.pollRepository.save(poll);
  }
}
