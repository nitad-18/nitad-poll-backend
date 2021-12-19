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
import { RequestWithUserId } from 'src/common/types/auth';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { UpdatePollOptionDto } from './dto/update-poll-option.dto';

//  TODO Complete the CRUD of poll-option
//*
//* >> POST options
//*      - return status 201 if work properly
//*      - return status 404 if not found poll
//*
//* >> GET options
//*      - return status 200 if work properly
//*
//* >> GET options/:id
//*      - return status 200 if work properly
//*      - return status 404 if not found poll-option
//*
//* >> PATCH options/:id
//*      - return status 200 if work properly
//*      - return status 403 if logged in user not match with poll's author
//*      - return status 404 if not found poll-option
//*
//* >> DELETE options/:id
//*      - return status 204 if work properly
//*      - return status 403 if logged in user not match with poll's author
//*      - return status 404 if not found poll-option
//*

@UseGuards(JwtAuthGuard)
@Controller('options')
export class PollOptionController {
  @Post()
  async create(@Body() createPollOptionDto: CreatePollOptionDto, @Res() res: Response) {}

  @Get()
  async findAll(@Res() res: Response) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {}

  @Patch(':id')
  async update(
    @Req() req: RequestWithUserId,
    @Param('id') id: string,
    @Body() updatePollOptionDto: UpdatePollOptionDto,
    @Res() res: Response,
  ) {}

  @Delete(':id')
  async remove(@Req() req: RequestWithUserId, @Param('id') id: string, @Res() res: Response) {}
}
