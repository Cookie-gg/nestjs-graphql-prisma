import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '~/modules/app';
import { mocks } from '~/mocks';
import { PrismaService } from '~/services/prisma';
import { UserService } from '~/services/user';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    userService.clear();
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => prisma.$disconnect());

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user at first', async () => {
    const user = await userService.create(mocks.user.user);
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should find a user by id', async () => {
    const user = await userService.find({ uid: mocks.user.user.uid });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should update a user name', async () => {
    const user = await userService.update({
      where: { uid: mocks.user.user.uid },
      data: { name: { set: mocks.user.updatedName } },
    });
    expect(user).toStrictEqual(
      expect.objectContaining({ ...mocks.user.user, name: mocks.user.updatedName }),
    );
  });

  it('should delete a user by email or id', async () => {
    await userService.delete({ uid: mocks.user.user.uid });
    const user = await userService.find({ uid: mocks.user.user.uid });
    expect(user).toBeNull();
  });
});
