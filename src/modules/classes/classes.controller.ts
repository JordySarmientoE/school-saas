import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { ClassesService } from './classes.service';

@Controller('class')
export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener Clases' })
  @ApiResponse({
    status: 200,
    // type: AuthResponseDto,
  })
  async list(@Req() req: Request) {
    const userId = req.user.userId;
    return this.service.list(userId);
  }
}
