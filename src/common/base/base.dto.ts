import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class BaseDto {
  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ type: 'string' })
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
