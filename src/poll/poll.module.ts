import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Poll } from './entities/poll.entity';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Poll])],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
