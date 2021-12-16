import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePollDto {
  @IsNotEmpty()
  @MinLength(4)
  question: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
