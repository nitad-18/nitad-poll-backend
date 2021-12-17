import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePollOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  pollId: number;
}
