import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../entities/user-role.entity';

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

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  @IsIn(Object.values(Role), {
    each: true,
    message: `El rol debe ser alguno de estos valores: ${Object.values(Role).join(', ')}`,
  })
  @ApiProperty({ example: 'TEACHER', enum: Role, required: false })
  role?: Role;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @IsString()
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone: string;
}
