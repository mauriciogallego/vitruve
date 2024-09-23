import { PartialType } from '@nestjs/swagger';
import { CreateAthleteDto } from './create-athlete.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAthleteDto extends PartialType(CreateAthleteDto) {
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
