import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @ApiProperty({ example: 'Colegio San José' })
  @Transform(({ value }) => String(value).trim())
  name: string;

  @IsString()
  @ApiProperty({ example: 'Av. Los Jardines 123, Lima' })
  @Transform(({ value }) => String(value).trim())
  address: string;

  @ApiProperty({ example: '987654321' })
  @IsNumberString({}, { message: 'Teléfono debe contener solo números' })
  @IsOptional()
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone: string;

  @IsEmail()
  @ApiProperty({ example: 'contacto@colegiosanjose.edu.pe' })
  @IsOptional()
  @Transform(({ value }) => String(value).toLowerCase().toLowerCase())
  email: string;
}
