import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '~/domain/entities/user';

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: false })
  token!: string;
  @Field(() => String, { nullable: false })
  refreshToken!: string;
  @Field(() => User)
  user!: User;
}

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  uniqueInfo!: string;
  @Field(() => String, { nullable: false })
  password!: string;
}
