import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { SchoolDto } from './dto/school.dto';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../users/entities/user-role.entity';
import { CreateSchoolDto } from './dto/create-school.dto';

@Controller('school')
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('')
  @ApiOperation({ summary: 'Registrar Escuela' })
  @ApiResponse({
    status: 200,
    type: SchoolDto,
  })
  async create(@Body() body: CreateSchoolDto) {
    return this.service.create(body);
  }

  @Get('')
  @ApiOperation({ summary: 'Listar Escuelas' })
  @ApiResponse({
    status: 200,
    type: [SchoolDto],
  })
  async list() {
    return this.service.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Escuela' })
  @ApiResponse({
    status: 200,
    type: SchoolDto,
  })
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }
}
