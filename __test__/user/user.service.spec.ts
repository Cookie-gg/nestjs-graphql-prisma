import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '~/app.module';
import { mocks } from '~/mocks';
import { UserCreateInput } from '~/models/user';
import { PrismaService } from '~/prisma.service';
import { UserService } from '~/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => prisma.$disconnect());

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user at first', async () => {
    const inputs: UserCreateInput = {
      name: 'test',
      uid: 't_e_s_t',
      email: 'test@example.com',
      password: 'hogehoge',
    };
    const user = await userService.create(inputs);
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should find a user by id', async () => {
    const { id } = mocks.user.user;
    const userById = await userService.find({ id });
    expect(userById).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should update a user name', async () => {
    const { id } = mocks.user.user;
    const user = await userService.update({
      where: { id },
      data: { name: { set: 'updated name' } },
    });
    expect(user).toStrictEqual(
      expect.objectContaining({ ...mocks.user.user, name: 'updated name' }),
    );
  });

  it('should delete a user by email or id', async () => {
    const { id } = mocks.user.user;
    await userService.delete({ id });
    const user = await userService.find({ id });
    expect(user).toBeNull();
  });
});
