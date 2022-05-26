import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '~/domain/entities/user';
import { JwtGuard } from '~/guards/jwt';
import { JwtRefreshGuard } from '~/guards/jwt-refresh';
import { LocalGuard } from '~/guards/local';
import { Auth, LoginInput } from '~/domain/models/auth';
import { AuthService } from '~/services/auth';
import { FastifyRequest } from 'fastify';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(LocalGuard)
  login(
    @Args('inputs') inputs: LoginInput,
    @Context() context: FastifyRequest & { user: User },
  ): Promise<Auth> {
    return this.authService.login(context.user);
  }

  @Mutation(() => Auth)
  @UseGuards(JwtGuard)
  status(@Context() context: { req: Request & { user: User } }): Promise<Auth> {
    return this.authService.login(context.req.user);
  }

  @Mutation(() => Auth)
  @UseGuards(JwtRefreshGuard)
  refresh(@Context() context: { req: Request & { user: User } }): Promise<Auth> {
    return this.authService.login(context.req.user);
  }
}
