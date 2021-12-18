import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EditProfileDto } from 'src/auth/dto/edit-profile.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserData } from 'src/utilities/type';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

const SALTROUND = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(registerDto: RegisterDto): Promise<UserData | null> {
    const findUser = await this.userRepository.findOne({ username: registerDto.username });

    if (findUser) {
      return null;
    }

    registerDto.password = await bcrypt.hash(registerDto.password, SALTROUND);

    const user = this.userRepository.create(registerDto);
    const { createdDate, deletedDate, updatedDate, password, ...result } =
      await this.userRepository.save(user);

    return result;
  }

  async findAll(): Promise<UserData[]> {
    return await this.userRepository.find();
  }

  async findOne(loginDto: LoginDto): Promise<UserData | null> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .where({ username: loginDto.username })
      .select(['user.id', 'user.username', 'user.displayName'])
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return null;
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      console.log(user);
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, editProfileDto: EditProfileDto): Promise<UpdateResult | null> {
    try {
      if (editProfileDto.password) {
        editProfileDto.password = await bcrypt.hash(editProfileDto.password, SALTROUND);
      }
      return await this.userRepository.update(id, editProfileDto);
    } catch (err) {
      return null;
    }
  }

  async remove(id: number): Promise<DeleteResult | null> {
    return await this.userRepository.softDelete(id);
  }
}
