import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserData } from 'src/utilities/type';
import * as connectionConfig from 'test/config/typeorm';
import { Connection, createConnection, getConnection, getRepository, Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

let service: UserService;
let repository: Repository<User>;
let connection: Connection;
let allUsers: User[];
let targets: Map<number, UserData>;

const testConnectionName = 'testUserServiceConnection';

describe('UserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    await useSeeding({
      connection: connectionConfig.name,
      root: 'test/config',
      configName: 'typeorm.ts',
    });

    allUsers = await factory(User)().createMany(50);
    targets = new Map<number, UserData>();

    for (let i = 0; i < 10; i++) {
      let targetUserId: number = faker.datatype.number(49);
      const { deletedDate, updatedDate, createdDate, password, ...result } = allUsers[targetUserId];
      const targetUser: UserData = result;
      targetUserId++;
      targets.set(targetUserId, targetUser);
    }

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all userData for findAll', async () => {
    const allUsers = await repository.find({ select: ['id', 'username', 'displayName'] });
    const result = await service.findAll();
    expect(result.length).toEqual(50);
    expect(result).toEqual(allUsers);
  });

  it('should return appended userData after register new user', async () => {
    const userData: RegisterDto = {
      username: faker.internet.email(),
      displayName: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const expected: UserData = {
      id: 51,
      username: userData.username,
      displayName: userData.displayName,
    };
    const user = await service.create(userData);
    const result = await service.findAll();
    expect(result.length).toEqual(51);
    expect(user).toEqual(expected);
  });

  it('should return userData for findOne', async () => {
    const userData: RegisterDto = {
      username: faker.internet.email(),
      displayName: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const loginData: LoginDto = {
      username: userData.username,
      password: userData.password,
    };
    const expected: UserData = {
      id: 51,
      username: userData.username,
      displayName: userData.displayName,
    };
    await service.create(userData);
    const result = await service.findOne(loginData);
    expect(result).toEqual(expected);
  });

  it('should return userData for findById', async () => {
    for (const target of targets) {
      expect(await service.findById(target[0])).toEqual(target[1]);
    }
  });

  it('should return user for getAllUserDataByID', async () => {
    for (const target of targets) {
      expect(await service.getAllUserDataByID(target[0])).toEqual(allUsers[target[0] - 1]);
    }
  });

  it('should return user for updatedUser', async () => {
    const userIds = Array.from(targets.keys());
    await service.update(userIds[0], { displayName: 'updated' });
    await service.update(userIds[1], { username: 'updated' });
    await service.update(userIds[2], { password: 'password' });

    expect((await service.getAllUserDataByID(userIds[0])).displayName).toEqual('updated');
    expect((await service.getAllUserDataByID(userIds[1])).username).toEqual('updated');
    const getPassword = (await service.getAllUserDataByID(userIds[2])).password;
    expect(await bcrypt.compare('password', getPassword)).toEqual(true);
  });

  it('should return user for that not removed', async () => {
    const removedUser: UserData[] = [];
    let count = 0;
    for (const target of targets) {
      removedUser.push(target[1]);
      await service.remove(target[0]);
    }
    const result: UserData[] = await service.findAll();

    for (const user of result) {
      if (targets.has(user.id)) {
        count++;
      }
    }

    expect(count).toEqual(0);
  });
});
