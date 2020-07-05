import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './model/payload.model';
import { UserRepository } from './user.respository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'codexSecret20',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;

    const user = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
