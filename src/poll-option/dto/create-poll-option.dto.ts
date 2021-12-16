import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePollOptionDto {
  @IsNotEmpty()
  @MinLength(4)
  topic: string;

  @IsNotEmpty()
  pollId: number;
}
