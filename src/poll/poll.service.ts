import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';

//  TODO #TASK 3 Complete all function inthe service EXCEPT vote and close
//* You MUST assign the datatype to each function
//*
//* >> create
//*     - save the relation of user and poll
//*
//* >> findAll and findOne
//*     - return data must contain the author and users as type UserData
//*
//* >> type UserData = {
//*       id: number,
//*       username: string,
//*       displayName: string
//*     }
//*

// TODO #TASK 5 Complete the vote and close poll function
//*
//* >> vote
//*     - if not found poll return null
//*     - if cannot vote return undefined
//*     - update users that vote poll and increase the votes by 1 if user can vote properly
//*
//* >> close
//*     - close the poll
//*     - return poll

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
