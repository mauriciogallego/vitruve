import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsOptional } from 'class-validator';

export class GetQueryArgsDto {
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
  where?: Record<string, unknown>;

  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  orderBy?: Record<string, 'asc' | 'desc'>;
}
