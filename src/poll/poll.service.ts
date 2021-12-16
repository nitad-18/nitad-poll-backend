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

  async create(createPollDto: CreatePollDto, user: User): Promise<PollWithoutDeletedDate | null> {
    const poll = await this.pollRepository.create(createPollDto);
    poll.author = user;
    const { deletedDate, ...result } = await this.pollRepository.save(poll);
    return result;
  }

  async findAll() {
    return await this.pollRepository
      .createQueryBuilder()
      .select([
        'poll.id',
        'poll.question',
        'poll.isClose',
        'poll.closedDate',
        'poll.createdDate',
        'user.id',
        'user.username',
        'user.displayName',
        'poll_option.id',
        'poll_option.topic',
        'poll_option.votes',
      ])
      .from(Poll, 'poll')
      .leftJoin('poll.author', 'user')
      .leftJoin('poll.options', 'poll_option')
      .getMany();
  }

  async findOne(pollId: number): Promise<Poll | null> {
    return await this.pollRepository
      .createQueryBuilder()
      .where('poll.id = :id', { id: pollId })
      .select([
        'poll.id',
        'poll.question',
        'poll.isClose',
        'poll.closedDate',
        'poll.createdDate',
        'user.id',
        'user.username',
        'user.displayName',
        'poll_option.id',
        'poll_option.topic',
        'poll_option.votes',
      ])
      .from(Poll, 'poll')
      .leftJoin('poll.author', 'user')
      .leftJoin('poll.options', 'poll_option')
      .getOne();
  }

  async update(id: number, updatePollDto: UpdatePollDto): Promise<UpdateResult | null> {
    try {
      return await this.pollRepository.update(id, updatePollDto);
    } catch (err) {
      return null;
    }
  }

  async updateEntity(poll: Poll, updatePollDto: UpdatePollDto): Promise<Poll> {
    poll.question = updatePollDto.question;
    return await this.pollRepository.save(poll);
  }

  async remove(id: number): Promise<DeleteResult | null> {
    try {
      return await this.pollRepository.softDelete(id);
    } catch (err) {
      return null;
    }
  }

  async vote(user: User, pollId: number, optionId: number): Promise<Poll | null> {
    const poll: Poll = await this.pollRepository
      .createQueryBuilder()
      .where('poll.id = :id', { id: pollId })
      .select([
        'poll.id',
        'poll.question',
        'poll.isClose',
        'poll.closedDate',
        'poll.createdDate',
        'user.id',
        'user.username',
        'user.displayName',
        'poll_option.id',
        'poll_option.topic',
        'poll_option.votes',
      ])
      .from(Poll, 'poll')
      .leftJoin('poll.options', 'poll_option')
      .leftJoin('poll.users', 'user')
      .getOne();

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
}
