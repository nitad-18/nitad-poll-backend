import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePollOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  pollId: number;
}
