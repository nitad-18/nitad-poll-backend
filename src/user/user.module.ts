import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// TODO #TASK 2 import typeorm module

@Module({
  imports: [
    /* Import typeorm module here */
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
