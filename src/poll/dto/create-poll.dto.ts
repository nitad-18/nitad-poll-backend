import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePollDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
