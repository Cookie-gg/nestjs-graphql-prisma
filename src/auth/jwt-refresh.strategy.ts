import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserWhereUniqueInput } from '~/models/user';
import { UserService } from '~/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
    });
  }

  async validate(payload: UserWhereUniqueInput): Promise<User> {
    const user = await this.userService.find({ id: payload.id });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
