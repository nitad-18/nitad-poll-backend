import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';

//  TODO #TASK 3 Complete all function inthe service EXCEPT vote and close
//* You MUST assign the datatype to each function
//* >> create
//*     - must save relation of poll and user (author)
//*     - return Poll (not included updatedDate and deletedDate) instance if successfully created
//*
//* >> findAll()
//*     - return all poll in database type Poll[] (not included updatedDate and deletedDate)
//*         ** return data must contain the author and users as type UserData **
//*
//* >> findOne(pollId: number)
//*     - throw NotFoundException if not found poll
//*     - return Poll (not included updatedDate and deletedDate) instance
//*         ** return data must contain the author and users as type UserData **
//*
//* >> update(id: number, updatePollDto)
//*     - throw NotFoundException if not found poll (affected === 0)
//*     - return true if successfully updated
//*
//* >> delete(id: number)
//*     - throw NotFoundException if not found poll (affected === 0)
//*     - return true if successfully deleted
//*

// TODO #TASK 5 Complete the vote and close poll function
//*
//* >> vote(user: User, pollId: number, optionId: number)
//*     - throw NotFoundException if not found poll or not found poll-option,
//*     - throw ForbiddenException if user cannot vote (already vote or poll is closed)
//*     - update poll.users that user vote poll and increase the votes by 1 if user can vote
//*     - return Poll (not included updatedDate and deletedDate) instance if successfully vote
//*        ** return data must contain the author and users as type UserData **
//*
//* >> close(poll: Poll)
//*     - close the poll
//*     - return Poll (not included updatedDate and deletedDate) instance if successfully close
//*        ** return data must contain the author and users as type UserData **

@Injectable()
export class PollService {
  async create(createPollDto: CreatePollDto, user: User) {}

  async findAll() {}

  async findOne(pollId: number) {}

  async update(id: number, updatePollDto: UpdatePollDto) {}

  async updateEntity(poll: Poll, updatePollDto: UpdatePollDto) {}

  async remove(id: number) {}

  async vote(user: User, pollId: number, optionId: number) {}

  async close(poll: Poll) {}
}
