import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

// TODO #TASK 3 import typeorm module

@Module({
  imports: [
    /* Add typeorm module here */
  ],
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}
