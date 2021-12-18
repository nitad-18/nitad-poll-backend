import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { UserData } from 'src/utilities/type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user: UserData = await this.userService.create(registerDto);
    if (!user) {
      return res.status(422).json({ message: 'This username have been already existed' });
    }
    return res.status(201).json({ message: 'Successfully registered user', ...user });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.userService.findOne(loginDto);
    if (!user) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }
    const token: string = await this.authService.createToken(user);
    res.cookie('access_token', token, { httpOnly: true, secure: false });
    return res.status(200).json({ message: 'Successfully Login' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req, @Res() res: Response) {
    const user = await this.userService.findById(req.user.id);
    return res.status(200).json(user);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.status(204).send();
  }
}
