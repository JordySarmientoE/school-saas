import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Length,
  MinLength,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Juan' })
  @Transform(({ value }) => String(value).trim())
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'juan.perez@example.com' })
  @Transform(({ value }) => String(value).toLowerCase().toLowerCase())
  email: string;

  @IsString()
  @ApiProperty({ example: 'Pérez' })
  @Transform(({ value }) => String(value).trim())
  lastname: string;

  @IsString()
  @Transform(({ value }) => String(value).trim())
  @MinLength(5, { message: 'Contraseña debe tener al menos 5 caracteres' })
  @ApiProperty({ example: '12345' })
  password: string;

  @ApiProperty({ example: '987654321' })
  @IsNumberString({}, { message: 'Teléfono debe contener solo números' })
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone: string;
}
