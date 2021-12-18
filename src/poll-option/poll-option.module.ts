import { Module } from '@nestjs/common';
import { PollOptionController } from './poll-option.controller';
import { PollOptionService } from './poll-option.service';

// TODO #TASK 4 import module

@Module({
  imports: [
    /*Import typeorm module here*/
    /*Maybe you need to import other module*/
  ],
  controllers: [PollOptionController],
  providers: [PollOptionService],
})
export class PollOptionModule {}
