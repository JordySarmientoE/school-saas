import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { compareString } from 'src/@common/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isPasswordMatching = await compareString(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    return this.usersService.findById(user.userId);
  }

  async login(user: User) {
    const payload = {
      userId: user.userId,
      email: user.email,
      // role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      ...user,
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    return this.login(user);
  }
}
