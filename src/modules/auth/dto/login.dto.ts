import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'juan.perez@example.com', required: true })
  @Transform(({ value }) => String(value).trim())
  email: string;

  @IsString()
  @MinLength(5, { message: 'Contraseña debe tener al menos 5 caracteres' })
  @ApiProperty({ example: '12345', required: true })
  password: string;
}
