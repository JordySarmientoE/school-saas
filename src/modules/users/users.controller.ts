import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
}
