jest.useFakeTimers();

import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import * as connectionConfig from 'test/config/typeorm';
import { Connection, createConnection, getConnection, getRepository, Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import { EditProfileDto } from '../auth/dto/edit-profile.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserData } from '../common/types/user';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

let service: UserService;
let repository: Repository<User>;
let connection: Connection;

const testConnectionName = 'testUserServiceConnection';
const USER_NUMBER = 10;

async function initializeDatabase() {
  await useSeeding({
    connection: connectionConfig.name,
    root: 'test/config',
    configName: 'typeorm.ts',
  });

  await factory(User)().createMany(USER_NUMBER);
}
describe('UserService', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useClass: Repository }],
    }).compile();

    connection = await createConnection({
      type: 'sqlite',
      database: 'test/test.sqlite',
      dropSchema: true,
      entities: ['src/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(User, testConnectionName);
    repository.clear();
    service = new UserService(repository);
    await initializeDatabase();

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all', () => {
    it('Should be find all users', async () => {
      expect((await service.findAll()).length).toBe(USER_NUMBER);
    });
  });

  describe('create', () => {
    const userData: RegisterDto = {
      username: faker.internet.email(),
      displayName: faker.internet.userName(),
      password: faker.internet.password(),
    };
    it('Should return appended userData after register valid new user', async () => {
      const user = await service.create(userData);

      const result = await repository.findOne({ id: user.id });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('username', user.username);
      expect(result).toHaveProperty('displayName', user.displayName);
    });

    it('Should throw error if username is already used', async () => {
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = await repository.create(userData);
      await repository.save(user);

      const fn = async () => await service.create(userData);
      expect(fn()).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('find one', () => {
    const userData: RegisterDto = {
      username: faker.internet.email(),
      displayName: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const loginData: LoginDto = {
      username: userData.username,
      password: userData.password,
    };
    it('Should return user data for valid login dto in findOne', async () => {
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = await repository.create(userData);
      await repository.save(user);

      const result = await service.findOne(loginData);
      expect(result).toBeDefined();
      expect(result.id).toBe(user.id);
      expect(result.username).toBe(user.username);
      expect(result.displayName).toBe(user.displayName);
    });

    it.each`
      username             | password             | case
      ${userData.username} | ${'12345678'}        | ${'invalid password'}
      ${'unknown'}         | ${userData.password} | ${'invalid username'}
      ${'unknown'}         | ${'12345678'}        | ${'invalid username and password'}
    `(
      'Should throw Unauthorized for invalid login dto in findOne, ($case)',
      async ({ username, password }) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await repository.create(userData);
        await repository.save(user);

        const loginData: LoginDto = {
          username,
          password,
        };
        const fn = async () => await service.findOne(loginData);
        expect(fn()).rejects.toThrow(UnauthorizedException);
      },
    );
  });

  describe('find by ID', () => {
    it.each`
      id             | case
      ${1}           | ${'first user'}
      ${USER_NUMBER} | ${'last user'}
    `('should return userData if valid ID, ($case)', async ({ id }) => {
      const user = await service.findById(id);

      expect(user).toBeDefined();
    });

    it.each`
      id                 | case
      ${-1}              | ${'negative ID'}
      ${USER_NUMBER + 1} | ${'exceed ID'}
    `('should throw NotFoundException if invalid ID, ($case)', async ({ id }) => {
      const fn = async () => await service.findById(id);

      expect(fn()).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it.each`
      id   | editProfileDto                                                                                                       | case
      ${1} | ${{ username: faker.internet.email() }}                                                                              | ${'update username'}
      ${2} | ${{ password: faker.internet.password() }}                                                                           | ${'update password'}
      ${3} | ${{ displayName: faker.internet.userName() }}                                                                        | ${'update displayname'}
      ${4} | ${{ username: faker.internet.email(), password: faker.internet.password(), displayName: faker.internet.userName() }} | ${'update all'}
    `('should updated user correctly ($case)', async ({ id, editProfileDto }) => {
      await service.update(id, editProfileDto);

      const user: UserData & { password: string } = await repository
        .createQueryBuilder('user')
        .where({ id })
        .addSelect('user.password')
        .getOne();

      if (editProfileDto.username) {
        expect(user.username).toMatch(editProfileDto.username);
      }
      if (editProfileDto.password) {
        expect(user.password).toBe(editProfileDto.password);
      }
      if (editProfileDto.displayName) {
        expect(user.displayName).toMatch(editProfileDto.displayName);
      }
    });
    it.each`
      id                 | case
      ${-1}              | ${'negative ID'}
      ${USER_NUMBER + 1} | ${'exceed ID'}
    `('should throw NotFoundException if not found user ($case)', async ({ id }) => {
      const editProfileDto: EditProfileDto = {};
      const fn = async () => await service.update(id, editProfileDto);

      expect(fn()).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it.each`
      ids                 | case
      ${[1]}              | ${'delete single users'}
      ${[1, USER_NUMBER]} | ${'delete multiple users'}
    `('should remove user correctly, ($case)', async ({ ids }) => {
      for (let i = 0; i < ids.length; i++) {
        await service.remove(ids[i]);
      }

      const users = await repository.find();

      expect(users.length).toEqual(USER_NUMBER - ids.length);

      for (let i = 0; i < users.length; i++) {
        expect(ids).not.toContain(users[i]);
      }
    });
    it.each`
      id                 | case
      ${-1}              | ${'negative ID'}
      ${USER_NUMBER + 1} | ${'exceed ID'}
    `('should throw NotFoundException if invalid user ID, ($case)', async ({ id }) => {
      const fn = async () => await service.remove(id);

      expect(fn()).rejects.toThrow(NotFoundException);
    });
  });
});
