import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User, UserCreateInput, UserWhereUniqueInput } from '~/domain/entities/user';
import { AuthService } from '~/services/auth';
import { UserService } from '~/services/user';
import { Auth } from '~/domain/models/auth';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  async createUser(@Args('args') args: UserCreateInput): Promise<Auth> {
    const user = await this.userService.create(args);
    return await this.authService.login(user);
  }

  @Mutation(() => User)
  deleteUser(@Args('args') args: UserWhereUniqueInput) {
    return this.userService.delete(args);
  }

  @Query(() => User)
  getUser(@Args('args') args: UserWhereUniqueInput) {
    return this.userService.find(args);
  }

  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }
}
