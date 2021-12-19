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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUserId } from 'src/utilities/type';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';
import { PollOptionService } from './poll-option.service';

@ApiTags('Poll Option')
@UseGuards(JwtAuthGuard)
@Controller('options')
export class PollOptionController {
  constructor(private readonly pollOptionService: PollOptionService) {}

  @Post()
  async create(@Body() createPollOptionDto: CreatePollOptionDto, @Res() res: Response) {
    const { poll, deletedDate, ...result } = await this.pollOptionService.create(
      createPollOptionDto,
    );
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.pollOptionService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const option = await this.pollOptionService.findOne(+id);
    return res.status(HttpStatus.OK).json(option);
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Body() updatePollOptionDto: UpdatePollOptionDto,
    @Res() res: Response,
  ) {
    const option = await this.pollOptionService.findOne(+id);
    if (option.poll.author.id !== req.user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.pollOptionService.update(+id, updatePollOptionDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: RequestWithUserId, @Param('id') id: string, @Res() res: Response) {
    const pollOption = await this.pollOptionService.findOne(+id);
    if (pollOption.poll.author.id !== req.user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    await this.pollOptionService.remove(+id);
    return res.send();
  }
}
