import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserData } from 'src/utilities/type';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async createToken(user: UserData) {
    const payload = {
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
