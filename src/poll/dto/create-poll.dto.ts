import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePollDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  question: string;
}
