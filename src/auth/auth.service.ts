import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './model/payload.model';
import { Token } from './model/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken } as Token;
  }
}
