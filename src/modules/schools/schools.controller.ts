import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { SchoolDto } from './dto/school.dto';

@Controller('school')
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}

  @Get('')
  @ApiOperation({ summary: 'Obtener Escuelas' })
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
