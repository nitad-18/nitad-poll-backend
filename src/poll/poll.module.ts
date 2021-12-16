import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOption } from 'src/poll-option/entities/poll-option.entity';
import { UserModule } from 'src/user/user.module';
import { Poll } from './entities/poll.entity';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Poll, PollOption])],
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}
