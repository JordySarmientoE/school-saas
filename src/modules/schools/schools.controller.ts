import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { SchoolDto } from './dto/school.dto';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SuperAdmin } from 'src/@common/decorators/super-admin.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SuperAdminGuard } from 'src/@common/guards/super-admin.guard';

@Controller('school')
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}

  @SuperAdmin()
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
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
