import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto {
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
  @ApiProperty({ example: 'Pérez', required: false })
  lastname?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  @MinLength(5, { message: 'Contraseña debe tener al menos 5 caracteres' })
  @ApiProperty({ example: 'newPassword123', required: false })
  password?: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @IsString()
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone: string;
}
