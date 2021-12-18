import { Injectable } from '@nestjs/common';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

//  TODO #TASK 2 Complete the user service to work correctly
//* You MUST assign the return type of each function`
//* You can each function test by run `yarn test:user`
//* HINT the process in each function MUST use the parameter

const SALTROUND = 10;

@Injectable()
export class UserService {
  async create(registerDto: RegisterDto) {}

  async findAll() {}

  async findOne(loginDto: LoginDto) {}

  async findById(id: number) {}

  async update(id: number, editProfileDto: EditProfileDto) {}

  async remove(id: number) {}
}
