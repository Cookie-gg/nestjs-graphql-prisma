import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma.service';
import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
