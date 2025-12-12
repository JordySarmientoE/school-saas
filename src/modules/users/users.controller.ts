import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdmin } from 'src/@common/decorators/super-admin.decorator';
import { SuperAdminGuard } from 'src/@common/guards/super-admin.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { RolesGuard } from 'src/@common/guards/roles.guard';
import { SchoolRole } from '../schools/entities/school-user.entity';

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
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @ApiBearerAuth()
  @Get('')
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async listAll(@Query() filters: ListUsersDto) {
    return this.service.list(filters);
  }

  @Roles(SchoolRole.COORDINATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Listar usuarios por escuela' })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async listAllBySchool(
    @Query() filters: ListUsersDto,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ) {
    return this.service.list(filters, schoolId);
  }
}
