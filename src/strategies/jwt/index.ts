import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserWhereUniqueInput } from '~/domain/entities/user';
import { UserService } from '~/services/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: UserWhereUniqueInput): Promise<User> {
    const user = await this.userService.find({ id: payload.id });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
