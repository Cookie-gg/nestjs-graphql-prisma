import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '~/models/user';
import { LocalGuard } from './local.guard';
import { Auth, AuthLoginInputs } from './auth.model';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { FastifyRequest } from 'fastify';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(LocalGuard)
  login(
    @Args('inputs') inputs: AuthLoginInputs,
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
