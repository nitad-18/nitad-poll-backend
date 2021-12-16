import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollModule } from 'src/poll/poll.module';
import { UserModule } from 'src/user/user.module';
import { PollOption } from './entities/poll-option.entity';
import { PollOptionController } from './poll-option.controller';
import { PollOptionService } from './poll-option.service';

@Module({
  imports: [UserModule, PollModule, TypeOrmModule.forFeature([PollOption])],
  controllers: [PollOptionController],
  providers: [PollOptionService],
})
export class PollOptionModule {}
