import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { Role } from './entities/user-role.entity';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

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

  @Roles(Role.COORDINATOR)
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
