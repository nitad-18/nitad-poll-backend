import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from 'src/poll/entities/poll.entity';
import { PollOption } from './entities/poll-option.entity';
import { PollOptionController } from './poll-option.controller';
import { PollOptionService } from './poll-option.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollOption, Poll])],
  controllers: [PollOptionController],
  providers: [PollOptionService],
})
export class PollOptionModule {}
