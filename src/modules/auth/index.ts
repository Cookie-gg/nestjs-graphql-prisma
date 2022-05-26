import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '~/services/prisma';
import { UserModule } from '~/modules/user';
import { AuthResolver } from '~/resolvers/auth';
import { AuthService } from '~/services/auth';
import { JwtStrategy } from '~/strategies/jwt';
import { JwtRefreshStrategy } from '~/strategies/jwt-refresh';
import { LocalStrategy } from '~/strategies/local';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
