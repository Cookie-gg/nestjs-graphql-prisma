import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateInput } from '~/models/user';
import { PrismaService } from '~/prisma.service';
import { UserService } from '~/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;
  const mock: UserCreateInput = {
    name: 'test',
    email: 'test@example.com',
    password: 'hogehoge',
    published: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => prisma.$disconnect());

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user at first', async () => {
    const data: UserCreateInput = {
      name: 'test',
      email: 'test@example.com',
      password: 'hogehoge',
      published: false,
    };
    const user = await userService.create(data);
    expect(user).toStrictEqual(expect.objectContaining({ id: 1, ...data }));
  });

  it('should find a user by email or id', async () => {
    const id = 1;
    const user = await userService.find(id);
    expect(user).toStrictEqual(expect.objectContaining({ id, ...mock }));
  });

  it('should delete a user by email or id', async () => {
    const id = 1;
    await userService.delete(id);
    const user = await userService.find(id);
    expect(user).toBeNull();
  });
});
