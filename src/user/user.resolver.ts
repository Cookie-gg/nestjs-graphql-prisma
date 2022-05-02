import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User, UserCreateInput } from '~/models/user';
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
  deleteUser(
    @Args('id', { nullable: true }) id?: number,
    @Args('email', { nullable: true }) email?: string,
  ) {
    return this.userService.delete(id, email);
  }

  @Query(() => User)
  getUser(
    @Args('id', { nullable: true }) id?: number,
    @Args('email', { nullable: true }) email?: string,
  ) {
    return this.userService.find(id, email);
  }

  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }
}
