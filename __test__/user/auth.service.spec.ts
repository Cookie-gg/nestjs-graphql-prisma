import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '~/app.module';
import { AuthService } from '~/auth/auth.service';
import { LocalGuard } from '~/auth/local.guard';
import { mocks } from '~/mocks';
import { User, UserCreateInput } from '~/models/user';
import { PrismaService } from '~/prisma.service';
import { UserService } from '~/user/user.service';
describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(() => prisma.$disconnect());

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should create a user at first', async () => {
    const user: User = {
      password: 'hogehoge',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...mocks.user.user,
    };
    const res = await authService.login(user);
    expect(res.user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });
});
