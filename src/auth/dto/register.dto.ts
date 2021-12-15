import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must at least 8 characters' })
  password: string;

  @IsNotEmpty()
  @Length(1, 15, { message: 'Displayname must between 1 and 15 characters' })
  displayName: string;
}
