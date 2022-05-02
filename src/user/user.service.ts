import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserCreateInput } from '~/models/user';
import { PrismaService } from '~/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // create user
  async create(data: UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  // delete user
  async delete(id?: number, email?: string) {
    this.searchValidation(id, email);
    return await this.prisma.user.delete({ where: { id } || { email } });
  }

  // get all users
  async findAll() {
    return await this.prisma.user.findMany();
  }

  // get user
  async find(id?: number, email?: string) {
    this.searchValidation(id, email);
    return await this.prisma.user.findUnique({ where: { id } || { email } });
  }

  searchValidation(id?: number, email?: string) {
    if (!email && !id)
      throw new NotAcceptableException('at least email or id is required');
  }
}
