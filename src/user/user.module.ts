import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { PrismaService } from '~/prisma.service';
import { UserResolver } from '~/user/user.resolver';
import { UserService } from '~/user/user.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
