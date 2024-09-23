import { ApiProperty } from '@nestjs/swagger';
import {
  IsJSON,
  IsNumberString,
  IsOptional,
  IsBooleanString,
} from 'class-validator';

export class ListQueryArgsDto {
  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  select?: Record<string, unknown>;

  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  include?: Record<string, boolean>;

  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  orderBy?: Record<string, 'desc' | 'asc'> | Record<string, 'desc' | 'asc'>[];

  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  where?: Record<string, unknown>;

  @IsNumberString()
  @IsOptional()
  skip?: number;

  @IsNumberString()
  @IsOptional()
  take?: number;

  @IsBooleanString()
  @IsOptional()
  includeCount?: boolean;

  @IsBooleanString()
  @IsOptional()
  isList?: boolean;
}
