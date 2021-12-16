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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PollService } from 'src/poll/poll.service';
import { RequestWithUserId } from 'src/utilities/type';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';
import { PollOptionService } from './poll-option.service';

@ApiTags('Poll Option')
@UseGuards(JwtAuthGuard)
@Controller('options')
export class PollOptionController {
  constructor(
    private readonly pollOptionService: PollOptionService,
    private readonly pollService: PollService,
  ) {}

  @Post()
  async create(@Body() createPollOptionDto: CreatePollOptionDto, @Res() res: Response) {
    const targetPoll = await this.pollService.findOne(createPollOptionDto.pollId);
    if (!targetPoll) {
      return res.status(404).send();
    }
    const { poll, deletedDate, ...result } = await this.pollOptionService.create(
      createPollOptionDto,
      targetPoll,
    );
    return res.status(201).json(result);
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res.status(200).json(await this.pollOptionService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const option = await this.pollOptionService.findOne(+id);
    if (!option) {
      return res.status(404).send();
    }
    return res.status(200).json(option);
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Body() updatePollOptionDto: UpdatePollOptionDto,
    @Res() res: Response,
  ) {
    const option = await this.pollOptionService.findOne(+id);
    if (!option) {
      return res.status(404).send();
    }
    if (option.poll.author.id !== req.user.id) {
      return res.status(403).send();
    }
    return res.status(200).json(await this.pollOptionService.update(+id, updatePollOptionDto));
  }

  @Delete(':id')
  async remove(@Req() req: RequestWithUserId, @Param('id') id: string, @Res() res: Response) {
    const pollOption = await this.pollOptionService.findOne(+id);
    if (!pollOption) {
      return res.status(404).send();
    }
    if (pollOption.poll.author.id !== req.user.id) {
      return res.status(403).send();
    }
    await this.pollOptionService.remove(+id);
    return res.status(204).send();
  }
}
