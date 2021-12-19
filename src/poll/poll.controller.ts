import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PollWithoutDeletedDate, RequestWithUserId } from 'src/utilities/type';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollService } from './poll.service';

@ApiTags('Poll')
@UseGuards(JwtAuthGuard)
@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService, private userService: UserService) {}

  @Post()
  async create(
    @Req() req: RequestWithUserId,
    @Body() createPollDto: CreatePollDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User = await this.userService.findById(req.user.id);
    const poll: PollWithoutDeletedDate = await this.pollService.create(createPollDto, user);
    return res.status(HttpStatus.CREATED).json(poll);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json(await this.pollService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const poll = await this.pollService.findOne(+id);
    return res.status(HttpStatus.OK).json(poll);
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Body() updatePollDto: UpdatePollDto,
    @Res() res: Response,
  ): Promise<Response> {
    const poll = await this.pollService.findOne(+id);
    if (poll.author.id !== req.user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    return res.status(HttpStatus.OK).json(await this.pollService.updateEntity(poll, updatePollDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const poll = await this.pollService.findOne(+id);
    if (poll.author.id !== req.user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    await this.pollService.remove(+id);
    return res.send();
  }

  @ApiParam({ name: 'pollId' })
  @ApiParam({ name: 'optionId' })
  @Patch('vote/:pollId/options/:optionId')
  async vote(
    @Req() req: RequestWithUserId,
    @Param('pollId') pollId,
    @Param('optionId') optionId,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.findById(+req.user.id);
    const poll = await this.pollService.vote(user, +pollId, +optionId);
    return res.status(HttpStatus.OK).json(poll);
  }

  @ApiParam({ name: 'id' })
  @Patch('close/:id')
  async closeVote(
    @Req() req: RequestWithUserId,
    @Param('id') pollId,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.findById(+req.user.id);
    const poll = await this.pollService.findOne(+pollId);
    if (poll.author.id !== user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    return res.status(HttpStatus.OK).json(await this.pollService.close(poll));
  }
}
