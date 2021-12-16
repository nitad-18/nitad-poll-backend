import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PollWithoutDeletedDate } from 'src/utilities/type';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';

@Injectable()
export class PollService {
  constructor(@InjectRepository(Poll) private pollRepository: Repository<Poll>) {}

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
      ])
      .from(Poll, 'poll')
      .leftJoin('poll.author', 'user')
      .getMany();
  }

  async findOne(id: number): Promise<Poll | null> {
    return await this.pollRepository
      .createQueryBuilder()
      .where({ id: id })
      .select([
        'poll.id',
        'poll.question',
        'poll.isClose',
        'poll.closedDate',
        'poll.createdDate',
        'user.id',
        'user.username',
        'user.displayName',
      ])
      .from(Poll, 'poll')
      .leftJoin('poll.author', 'user')
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
}
