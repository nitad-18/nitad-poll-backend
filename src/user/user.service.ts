import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(registerDto: RegisterDto): Promise<User | null> {
    const userCount = await this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .orWhere('user.username = :username', { username: registerDto.username })
      .getCount();

    if (userCount > 0) {
      return null;
    }

    const saltRounds = 10;
    registerDto.password = await bcrypt.hash(registerDto.password, saltRounds);

    const user = this.userRepository.create(registerDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(loginDto: LoginDto): Promise<User | null> {
    let user: User;
    try {
      user = await this.userRepository.findOneOrFail({ username: loginDto.username });
    } catch (err) {
      return null;
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      return null;
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (err) {
      return null;
    }
  }

  async update(id: number, editProfileDto: EditProfileDto) {
    try {
      return await this.userRepository.update(id, editProfileDto);
    } catch (err) {
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (err) {
      return null;
    }
  }
}
