import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '~/models/user';

@InputType()
export class AuthLoginInputs {
  @Field(() => String, { nullable: false })
  uniqueInfo!: string;
  @Field(() => String, { nullable: false })
  password!: string;
}

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: false })
  token!: string;
  @Field(() => String, { nullable: false })
  refreshToken!: string;
  @Field(() => User)
  user!: User;
}
