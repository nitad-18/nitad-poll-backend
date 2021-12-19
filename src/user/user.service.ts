import { Injectable } from '@nestjs/common';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

//  TODO #TASK 2 Complete the user service to work correctly
//* You MUST assign the return type of each function`
//* You test each function by run `yarn test:user`
//*
//* >> create
//*     - throw UnprocessabelEntityException if username already exist
//*     - return User (only id, username, password) instance if successfully created
//*
//* >> findAll()
//*     - return all user in database type User[] (only id, username, password)
//*
//* >> findOne(loginDto: LoginDto)
//*     - use for validate login user
//*     - throw UnauthorizedException if Invalid Input (username or password wrong)
//*     - return User (only id, username, password) instance
//*
//* >> findById(id: number)
//*     - throw NotFoundException if not found user
//*     - return User (only id, username, password) instance
//*
//* >> update(id: number, editProfileDto)
//*     - throw NotFoundException if not found user (affected === 0)
//*     - return true if successfully updated
//*
//* >> delete(id: number)
//*     - throw NotFoundException if not found user (affected === 0)
//*     - return true if successfully deleted
//*
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
