import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User, UserCreateInput, UserWhereUniqueInput } from '~/models/user';
import { UserService } from '~/user/user.service';
import * as bcrypt from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('args') args: UserCreateInput) {
    args.password = await bcrypt.hash(args.password, 10);
    return this.userService.create(args);
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
