import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async createToken(user: User) {
    const payload = {
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
