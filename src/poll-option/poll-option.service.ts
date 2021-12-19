import { Injectable } from '@nestjs/common';
import { Poll } from 'src/poll/entities/poll.entity';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';

//  TODO #TASK 4 Complete the poll option service
//* You MUST assign datatype to every function
//*
//* >> create
//*     - must save relationship of poll and poll option (poll)
//*     - return PollOption (not included deletedDate and updatedDate) instance if successfully created
//*
//* >> findAll()
//*     - return all poll-option in database type PollOption[] (not included createdDate, updatedDate, deletedDate)
//*
//* >> findOne(pollId: number)
//*     - throw NotFoundException if not found poll-option
//*     - return PollOption (not included createdDate, deletedDate, updatedDate) instance
//*         ** poll data must contain with poll author's data **
//*
//* >> update(id: number, updatePollDto)
//*     - throw NotFoundException if not found poll-option (affected === 0)
//*     - return true if successfully updated
//*
//* >> delete(id: number)
//*     - throw NotFoundException if not found poll-option (affected === 0)
//*     - return true if successfully deleted
//*

@Injectable()
export class PollOptionService {
  async create(createPollOptionDto: CreatePollOptionDto, poll: Poll) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updatePollOptionDto: UpdatePollOptionDto) {}

  async remove(id: number) {}
}
