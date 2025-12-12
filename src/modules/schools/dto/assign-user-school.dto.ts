import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { SchoolRole } from '../entities/school-user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AssignUserSchoolDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsIn(Object.values(SchoolRole), {
    each: true,
    message: `El rol debe ser alguno de estos valores: ${Object.values(SchoolRole).join(', ')}`,
  })
  @ApiProperty({
    example: SchoolRole.TEACHER,
    enum: SchoolRole,
  })
  role: SchoolRole;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: [1, 2, 3], required: false })
  childrenIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: [1, 2, 3], required: false })
  parentIds?: number[];
}
