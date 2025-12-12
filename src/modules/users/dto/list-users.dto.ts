import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { SchoolRole } from 'src/modules/schools/entities/school-user.entity';

export class ListUsersDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  @ApiProperty({ example: 'Juan', required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  @ApiProperty({ example: 'juan.perez@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @IsString()
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(SchoolRole), {
    each: true,
    message: `El rol debe ser alguno de estos valores: ${Object.values(SchoolRole).join(', ')}`,
  })
  @ApiProperty({
    example: SchoolRole.TEACHER,
    enum: SchoolRole,
    required: false,
  })
  role?: SchoolRole;
}
