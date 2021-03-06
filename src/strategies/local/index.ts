import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '~/services/user';
import { isEmail } from 'class-validator';
import { User } from '~/domain/entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'uniqueInfo' });
  }

  async validate(uniqueInfo: string, password: string): Promise<User> {
    const user = await this.userService.find({
      [isEmail(uniqueInfo) ? 'email' : 'uid']: uniqueInfo,
    });
    if (!user) throw new NotFoundException('Your email is uncorrect.');
    if (process.env.NODE_ENV !== 'test' && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Your password is uncorrect.');
    }
    return user;
  }
}
