import { Body, Controller, Delete, Get, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { UserService } from './user.service';

//  TODO #TASK 2 Complete the User's CRUD
//* HINT the process in each endpoint MUST use the parameter

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() editProfileDto: EditProfileDto,
    @Res() res: Response,
  ) {}

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {}
}
