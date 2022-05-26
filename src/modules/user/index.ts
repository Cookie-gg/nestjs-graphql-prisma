import { Module } from '@nestjs/common';
import { AuthModule } from '~/modules/auth';
import { UserService } from '~/services/user';
import { PrismaService } from '~/services/prisma';
import { UserResolver } from '~/resolvers/user';

@Module({
  imports: [AuthModule],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
export class UserModule {}
