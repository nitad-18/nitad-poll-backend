import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must at least 8 characters' })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 15, { message: 'Displayname must between 1 and 15 characters' })
  displayName: string;
}
