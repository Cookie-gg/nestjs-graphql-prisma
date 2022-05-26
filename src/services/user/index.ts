import { Injectable } from '@nestjs/common';
import {
  UpdateOneUserArgs,
  User,
  UserCreateInput,
  UserWhereUniqueInput,
} from '~/domain/entities/user';
import { PrismaService } from '~/services/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // create user
  async create(data: UserCreateInput): Promise<User> {
    if (process.env.NODE_ENV !== 'test') data.password = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({ data });
  }

  // delete user
  async delete(where: UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({ where });
  }

  // get all users
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  // get user
  async find(where: UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }

  // update user
  async update(args: UpdateOneUserArgs): Promise<User> {
    return await this.prisma.user.update(args);
  }

  async clear() {
    this.prisma.user.deleteMany();
  }
}
