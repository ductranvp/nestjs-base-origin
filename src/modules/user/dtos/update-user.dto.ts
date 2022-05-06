import { RoleConstant } from '../../../constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: 'string' })
  firstName: string;

  @ApiProperty({ type: 'string' })
  lastName: string;

  @ApiProperty({ type: 'string', enum: RoleConstant })
  @IsEnum(RoleConstant)
  role: RoleConstant;

  @ApiProperty({ type: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  isActive?: boolean;
}
