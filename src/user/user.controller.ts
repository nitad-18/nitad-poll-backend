import { Body, Controller, Delete, Get, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Res() res: Response) {
    return res.status(200).json(this.userService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user: User = await this.userService.findById(+id);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() editProfileDto: EditProfileDto,
    @Res() res: Response,
  ) {
    const user: UpdateResult = await this.userService.update(+id, editProfileDto);
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const user: DeleteResult = await this.userService.remove(+id);
    if (!user) {
      return res.status(404);
    }
    return res.status(204);
  }
}
