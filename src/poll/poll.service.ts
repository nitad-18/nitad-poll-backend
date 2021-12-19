import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
    @InjectRepository(PollOption) private pollOptionRepository: Repository<PollOption>,
  ) {}

  async create(createPollDto: CreatePollDto, user: User): Promise<Poll> {
    const poll = await this.pollRepository.create(createPollDto);
    poll.author = user;
    const createdPoll = await this.pollRepository.save(poll);
    return new Poll({
      id: createdPoll.id,
      question: createdPoll.question,
      isClose: createdPoll.isClose,
      author: createdPoll.author,
      options: createdPoll.options,
      users: createdPoll.users,
      closedDate: createdPoll.closedDate,
      createdDate: createdPoll.createdDate,
    });
  }

  async findAll(): Promise<Poll[]> {
    return await this.pollRepository.find({ relations: ['author', 'users', 'options'] });
  }

  async findOne(pollId: number): Promise<Poll> {
    const poll = await this.pollRepository.findOne(
      { id: pollId },
      { relations: ['author', 'users', 'options'] },
    );
    if (!poll) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll',
      });
    }
    return poll;
  }

  async update(id: number, updatePollDto: UpdatePollDto): Promise<boolean> {
    const result = await this.pollRepository.update(id, updatePollDto);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll',
      });
    }
    return true;
  }

  async updateEntity(poll: Poll, updatePollDto: UpdatePollDto): Promise<Poll> {
    poll.question = updatePollDto.question;
    return await this.pollRepository.save(poll);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pollRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll',
      });
    }
    return true;
  }

  async vote(user: User, pollId: number, optionId: number): Promise<Poll | null> {
    const poll: Poll = await this.findOne(pollId);
    if (!poll) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll',
      });
    }

    if (poll.isClose) {
      throw new ForbiddenException({
        reason: 'FORBIDDEN',
        message: 'Cannot close other user poll',
      });
    }

    for (const votedUser of poll.users) {
      if (votedUser.id === user.id) {
        throw new ForbiddenException({
          reason: 'FORBIDDEN',
          message: 'Cannot vote poll that you have been already voted',
        });
      }
    }

    for (let i = 0; i < poll.options.length; i++) {
      if (poll.options[i].id === optionId) {
        poll.users.push(user);
        await this.pollOptionRepository.update(optionId, { votes: ++poll.options[i].votes });
        const updatedPoll = await this.pollRepository.save(poll);
        return new Poll(updatedPoll);
      }
    }
    throw new NotFoundException({
      reason: 'NOT_FOUND_ENTITY',
      message: 'Not found option',
    });
  }

  async close(poll: Poll): Promise<Poll> {
    poll.isClose = true;
    return await this.pollRepository.save(poll);
  }
}
