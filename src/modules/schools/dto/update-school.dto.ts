import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateSchoolDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Colegio San José', required: false })
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Av. Los Jardines 123, Lima', required: false })
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).trim(),
  )
  address?: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsNumberString({}, { message: 'Teléfono debe contener solo números' })
  @IsOptional()
  @Length(9, 9, { message: 'Teléfono debe tener 9 caracteres' })
  phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'contacto@colegiosanjose.edu.pe', required: false })
  @Transform(({ value }) =>
    value === undefined ? undefined : String(value).toLowerCase(),
  )
  email?: string;
}
