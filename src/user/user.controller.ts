import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { response } from 'express';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return response.json(this.userService.findAll()).status(200);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.userService.findById(+id);
    if (!user) {
      return response.status(404);
    }
    return response.json(user).status(200);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() editProfileDto: EditProfileDto) {
    const user: UpdateResult = await this.userService.update(+id, editProfileDto);
    if (!user) {
      return response.status(404);
    }
    return response.json(user).status(200);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user: DeleteResult = await this.userService.remove(+id);
    if (!user) {
      return response.status(404);
    }
    return response.status(204);
  }
}
