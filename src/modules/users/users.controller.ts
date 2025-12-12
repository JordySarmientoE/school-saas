import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdmin } from 'src/@common/decorators/super-admin.decorator';

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

  @SuperAdmin()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('')
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async listAll(@Query() filters: ListUsersDto) {
    return this.service.listAll(filters);
  }
}
