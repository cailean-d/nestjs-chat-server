import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ObjectID } from 'mongodb';

import { jwtConstants } from './constants';
import { JwtPayload } from 'src/auth/jwt-payload.model';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<UserEntity>> {
    return { id: new ObjectID(payload.sub), nickname: payload.nickname };
  }
}
