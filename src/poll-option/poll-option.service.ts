import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from 'src/poll/entities/poll.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';
import { PollOption } from './entities/poll-option.entity';

@Injectable()
export class PollOptionService {
  constructor(@InjectRepository(PollOption) private pollOptionRepository: Repository<PollOption>) {}

  async create(createPollOptionDto: CreatePollOptionDto, poll: Poll): Promise<PollOption> {
    const pollOption = await this.pollOptionRepository.create(createPollOptionDto);
    pollOption.poll = poll;
    return await this.pollOptionRepository.save(pollOption);
  }

  async findAll(): Promise<PollOption[]> {
    return await this.pollOptionRepository.find({ select: ['id', 'topic', 'votes'] });
  }

  async findOne(id: number): Promise<PollOption | null> {
    try {
      return await this.pollOptionRepository
        .createQueryBuilder()
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
        .from(PollOption, 'poll_option')
        .leftJoin('poll_option.poll', 'poll')
        .leftJoin('poll.author', 'user')
        .getOne();
    } catch (err) {
      return null;
    }
  }

  async update(id: number, updatePollOptionDto: UpdatePollOptionDto): Promise<UpdateResult | null> {
    try {
      return await this.pollOptionRepository.update(id, updatePollOptionDto);
    } catch (err) {
      return null;
    }
  }

  async remove(id: number): Promise<DeleteResult | null> {
    try {
      return await this.pollOptionRepository.softDelete(id);
    } catch (err) {
      return null;
    }
  }
}
