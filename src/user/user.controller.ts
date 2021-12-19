import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { UserData } from 'src/utilities/type';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const user: UserData[] = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user: UserData = await this.userService.findById(+id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() editProfileDto: EditProfileDto,
    @Res() res: Response,
  ) {
    await this.userService.update(+id, editProfileDto);
    const user = this.userService.findById(+id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.userService.remove(+id);
    return res.send();
  }
}
