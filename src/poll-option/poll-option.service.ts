import { Injectable } from '@nestjs/common';
import { Poll } from 'src/poll/entities/poll.entity';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';

//  TODO #TASK 4 Complete the poll option service
//* You MUST assign datatype to every function
//* create must save relationship of poll and poll option
//* findOne must return poll data with poll author's data

@Injectable()
export class PollOptionService {
  async create(createPollOptionDto: CreatePollOptionDto, poll: Poll) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updatePollOptionDto: UpdatePollOptionDto) {}

  async remove(id: number) {}
}
