import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
  })
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.service.validateUser(email, password);
    return this.service.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener Perfil' })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
  })
  getProfile(@Req() req: Request) {
    const userId = req.user.userId;
    return this.service.getProfile(userId);
  }
}
