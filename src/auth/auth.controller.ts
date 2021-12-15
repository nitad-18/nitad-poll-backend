import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    const user: User = await this.userService.create(registerDto);
    if (!user) {
      return res.status(422).json({ message: 'This username have been already existed' });
    }

    const { password, createdData, deletedDate, updatedDate, username, ...result } = user;
    return res.status(201).json({ message: 'Successfully registered user', ...result });
  }

  @Post('login')
  async login(@Res() res, @Body() loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    const token: string = await this.authService.createToken(user);
    res.cookie('access_token', token, { httpOnly: true, secure: false });
    return res.status(200).json({ message: 'Successfully Login' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req, @Res() res) {
    const { password, createdData, deletedDate, updatedDate, ...result } =
      await this.userService.findById(req.user.id);
    return res.status(200).json(result);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res) {
    res.clearCookie('access_token');
    return res.status(204).send();
  }
}
