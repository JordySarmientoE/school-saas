import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

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
}
