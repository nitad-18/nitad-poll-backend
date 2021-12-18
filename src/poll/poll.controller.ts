import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUserId } from 'src/utilities/type';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

// TODO #TASK 3 Complete the CRUD of poll EXCEPT PATCH polls/vote/{pollId}/options/{optionId} and PATCH polls/close{pollId}
//*
//* >> POST polls
//*      - return status 201 if work properly
//*
//* >> GET polls
//*      - return status 200 if work properly
//*
//* >> GET polls/:id
//*      - return status 200 if work properly
//*      - return status 404 if not found poll
//*
//* >> PATCH polls/:id
//*      - return status 200 if work properly
//*      - return status 403 if user not match with poll's author
//*      - return status 404 if not found poll
//*
//* >> DELETE polls/:id
//*      - return status 204 if work properly
//*      - return status 403 if logged in user not match with poll's author
//*      - return status 404 if not found poll
//*

// TODO #TASK 5 Complete the PATCH polls/vote/{pollId}/options/{optionId} and PATCH polls/close{pollId}
//*
//* >> PATCH polls/vote/{pollId}/options/{optionId}
//*      - return status 200 if work properly
//*      - return status 403 if user cannot vote
//*      - return status 404 if not found poll
//*
//* >> PATCH polls/close{pollId}
//*      - return status 200 if work properly
//*      - return status 403 if user cannot close poll
//*      - return status 404 if not found poll
//*

@UseGuards(JwtAuthGuard)
@Controller('polls')
export class PollController {
  @Post()
  async create(
    @Req() req: RequestWithUserId,
    @Body() createPollDto: CreatePollDto,
    @Res() res: Response,
  ) {}

  @Get()
  async findAll(@Res() res: Response) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {}

  @Patch(':id')
  async update(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Body() updatePollDto: UpdatePollDto,
    @Res() res: Response,
  ) {}

  @Delete(':id')
  async remove(@Req() req: RequestWithUserId, @Param('id') id: string, @Res() res: Response) {}

  @Patch('vote/:pollId/options/:optionId')
  async vote(
    @Req() req: RequestWithUserId,
    @Param('pollId') pollId,
    @Param('optionId') optionId,
    @Res() res: Response,
  ) {}

  @Patch('close/:id')
  async closeVote(@Req() req: RequestWithUserId, @Param('id') pollId, @Res() res: Response) {}
}
