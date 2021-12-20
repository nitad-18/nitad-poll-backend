import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from 'src/poll/entities/poll.entity';
import { Repository } from 'typeorm';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';
import { PollOption } from './entities/poll-option.entity';

@Injectable()
export class PollOptionService {
  constructor(
    @InjectRepository(PollOption) private pollOptionRepository: Repository<PollOption>,
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
  ) {}

  async create(createPollOptionDto: CreatePollOptionDto): Promise<PollOption> {
    const poll = await this.pollRepository.findOne(createPollOptionDto.pollId);
    if (!poll) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll option',
      });
    }
    const pollOption = await this.pollOptionRepository.create(createPollOptionDto);
    pollOption.poll = poll;
    const createdOption = await this.pollOptionRepository.save(pollOption);
    return new PollOption({
      id: createdOption.id,
      topic: createdOption.topic,
      votes: createdOption.votes,
    });
  }

  async findAll(): Promise<PollOption[]> {
    return await this.pollOptionRepository.find({ relations: ['poll'] });
  }

  async findOne(id: number): Promise<PollOption> {
    const option = await this.pollOptionRepository
      .createQueryBuilder('poll_option')
      .where('poll_option.id = :id', { id: id })
      .select([
        'poll_option.id',
        'poll_option.topic',
        'poll_option.votes',
        'poll.id',
        'poll.question',
        'poll.isClose',
        'poll.closedDate',
        'user.id',
        'user.username',
        'user.displayName',
      ])
      .leftJoin('poll_option.poll', 'poll')
      .leftJoin('poll.author', 'user')
      .getOne();
    if (!option) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll option',
      });
    }
    return option;
  }

  async update(id: number, updatePollOptionDto: UpdatePollOptionDto): Promise<boolean> {
    const result = await this.pollOptionRepository.update(id, updatePollOptionDto);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll option',
      });
    }
    return true;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pollOptionRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found poll option',
      });
    }
    return true;
  }
}
