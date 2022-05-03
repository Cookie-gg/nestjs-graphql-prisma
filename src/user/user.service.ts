import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserCreateInput, UserWhereUniqueInput } from '~/models/user';
import { PrismaService } from '~/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // create user
  async create(data: UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  // delete user
  async delete(data: UserWhereUniqueInput) {
    const where = this.searchValidation(data);
    return await this.prisma.user.delete({ where });
  }

  // get all users
  async findAll() {
    return await this.prisma.user.findMany();
  }

  // get user
  async find(data: UserWhereUniqueInput) {
    const where = this.searchValidation(data);
    return await this.prisma.user.findUnique({ where });
  }

  searchValidation({ id, email }: UserWhereUniqueInput) {
    if (!email && !id)
      throw new NotAcceptableException('at least email or id is required');
    return id ? { id } : { email };
  }
}
