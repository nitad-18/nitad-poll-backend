import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserData } from 'src/common/types/user';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';

const SALTROUND = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(registerDto: RegisterDto): Promise<UserData> {
    const findUser = await this.userRepository.findOne({ username: registerDto.username });

    if (findUser) {
      throw new UnprocessableEntityException({
        reason: 'INVALID_INPUT',
        message: 'User already existex',
      });
    }

    registerDto.password = await bcrypt.hash(registerDto.password, SALTROUND);

    const user = this.userRepository.create(registerDto);
    const createdUser = await this.userRepository.save(user);
    return new User({
      id: createdUser.id,
      username: createdUser.username,
      displayName: createdUser.displayName,
    });
  }

  async findAll(): Promise<UserData[]> {
    const users = await this.userRepository.find();
    return users.map(
      user =>
        new User({
          id: user.id,
          username: user.username,
          displayName: user.displayName,
        }),
    );
  }

  async findOne(loginDto: LoginDto): Promise<UserData> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .where({ username: loginDto.username })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new UnauthorizedException({
        reason: 'INVALID_INPUT',
        message: 'Incorrect username or password',
      });
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException({
        reason: 'INVALID_INPUT',
        message: 'Incorrect username or password',
      });
    }

    return new User({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    });
  }

  async findById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found user',
      });
    }
    return user;
  }

  async update(id: number, editProfileDto: EditProfileDto): Promise<boolean> {
    if (editProfileDto.password) {
      editProfileDto.password = await bcrypt.hash(editProfileDto.password, SALTROUND);
    }
    const result = await this.userRepository.update(id, editProfileDto);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found user',
      });
    }
    return true;
  }

  async remove(id: number): Promise<boolean> {
    const result: DeleteResult = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
        reason: 'NOT_FOUND_ENTITY',
        message: 'Not found user',
      });
    }
    return true;
  }
}
